import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The URL to the Google Maps place (Total Wraps and Tints Ltd)
const URL = "https://www.google.com/maps/place/Total+Wraps+and+Tints+Ltd";

async function main() {
  console.log("Starting Puppeteer scraper...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-GB']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to a reasonable size
    await page.setViewport({ width: 1280, height: 800 });

    // Set a user agent to look like a real browser
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Navigating to ${URL}...`);
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // Handle Cookie Consent
    // Look for buttons with text "Accept all" or similar
    try {
      // Wait a bit for the consent modal to potentially appear
      await new Promise(r => setTimeout(r, 3000));
      
      const consentButton = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        // Google often uses "Accept all" or "Accept" in English
        return buttons.find(b => 
          b.textContent?.trim() === 'Accept all' || 
          b.textContent?.trim() === 'Accept' ||
          b.querySelector('span')?.textContent?.trim() === 'Accept all'
        );
      });

      if (consentButton.asElement()) {
        console.log("Found consent button, clicking...");
        await consentButton.asElement()?.click();
        // Wait for the modal to disappear
        await new Promise(r => setTimeout(r, 5000));
        console.log("Consent handled (hopefully).");
      } else {
        console.log("No consent button found.");
      }
    } catch (e) {
      console.log("Error checking for consent:", e);
    }

    // Wait for the main content to load
    console.log("Waiting for main content...");
    try {
        await page.waitForSelector('h1', { timeout: 30000 });
        console.log("Found h1 title.");
    } catch (e) {
        console.log("Could not find h1, dumping page title...");
        const title = await page.title();
        console.log("Page title:", title);
        // Continue anyway, maybe we are on the right page
    }

    // Click on "Reviews" tab if we are not already seeing reviews
    // The reviews tab usually has aria-label="Reviews for..." or text "Reviews"
    try {
      const reviewsTab = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button[role="tab"]'));
        return buttons.find(b => b.textContent?.includes('Reviews'));
      });

      if (reviewsTab.asElement()) {
        console.log("Clicking Reviews tab...");
        await reviewsTab.asElement()?.click();
        await new Promise(r => setTimeout(r, 2000)); // Wait for tab switch
      }
    } catch (e) {
      console.log("Could not find or click Reviews tab (might already be on it).");
    }

    // Selector for the reviews container
    // This is tricky as class names are obfuscated. We usually look for a scrollable container.
    // A common pattern in GMaps is a div with role="main" containing the reviews list.
    // Or we can just try to scroll the element that contains the reviews.
    
    console.log("Looking for reviews...");
    
    // Wait for at least one review to appear
    await page.waitForSelector('.jftiEf', { timeout: 10000 }).catch(() => console.log("Timeout waiting for .jftiEf selector"));

    // Scroll to load more reviews
    // We need to find the scrollable container. It's usually the parent of the review elements.
    await page.evaluate(async () => {
      const reviews = document.querySelectorAll('.jftiEf');
      if (reviews.length > 0) {
        const container = reviews[0].parentElement;
        if (container) {
          for (let i = 0; i < 10; i++) { // Scroll more times to get all reviews
            container.scrollTop = container.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    });

    // Extract reviews
    const reviews = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.jftiEf'));
      
      return items.map(item => {
        const nameEl = item.querySelector('.d4r55');
        const dateEl = item.querySelector('.rsqaWe');
        const textEl = item.querySelector('.wiI7pd');
        const starsEl = item.querySelector('.kvMYJc');
        const avatarEl = item.querySelector('img.NBa7we');

        const rating = starsEl ? parseInt(starsEl.getAttribute('aria-label')?.split(' ')[0] || '5') : 5;
        
        return {
          name: nameEl?.textContent || "Anonymous",
          location: "Glasgow",
          rating: rating,
          text: textEl?.textContent || "",
          service: "Window Tinting & Wrapping",
          date: dateEl?.textContent || "Recent",
          verified: true,
          avatar: avatarEl?.getAttribute('src') || null
        };
      });
    });

    console.log(`Extracted ${reviews.length} reviews.`);

    if (reviews.length > 0) {
      const dataDir = path.join(process.cwd(), "src/data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Filter out empty reviews or anonymous ones if desired
      const validReviews = reviews.filter(r => r.name !== "Anonymous" && r.text.length > 0);

      if (validReviews.length > 0) {
        fs.writeFileSync(
          path.join(dataDir, "reviews.json"),
          JSON.stringify(validReviews, null, 2)
        );
        console.log(`Saved ${validReviews.length} valid reviews to src/data/reviews.json`);
      } else {
        console.warn("No valid reviews found after filtering.");
      }
    } else {
      console.warn("No reviews extracted.");
    }

  } catch (error) {
    console.error("Error during scraping:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
