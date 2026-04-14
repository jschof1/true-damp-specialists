import { scraper } from "google-maps-review-scraper";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The scraper can be picky about the URL format.
// If the one below fails, try the short "Share" link or the full address bar URL.
const URL = "https://www.google.com/maps/place/Total+Wraps+and+Tints+Ltd/@55.8596973,-4.1173219,17z/data=!3m1!4b1!4m6!3m5!1s0x4888419bbce52f5f:0xc297ed9721eef55b!8m2!3d55.8596973!4d-4.1173219!16s%2Fg%2F11kgdhcw8w?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";

async function main() {
  try {
    console.log("Scraping reviews from Google Maps...");
    // @ts-expect-error The scraper package does not currently ship compatible call types.
    const reviews = await scraper(URL, { 
      sort_type: "newest", 
      pages: 10, 
      clean: true 
    });

    if (Array.isArray(reviews) && reviews.length > 0) {
      const dataDir = path.join(process.cwd(), "src/data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Map the scraper data to our internal format if needed
      // Based on the library, "clean: true" typically returns:
      // { name, rating, text, date, profile_photo, ... }
      
      const formattedReviews = reviews.map(r => {
        let dateStr = "Recent";
        if (r.time?.published) {
          try {
            const d = new Date(r.time.published / 1000);
            dateStr = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
          } catch (e) {
            // Keep the fallback "Recent" label when the source timestamp is unusable.
          }
        }
        return {
          name: r.author?.name || "Anonymous",
          location: "Glasgow", // Scraper might not provide this specifically
          rating: r.review?.rating || 5,
          text: r.review?.text || "",
          service: "Kitchen Wrapping", // Default
          date: dateStr,
          verified: true,
          avatar: r.author?.profile_url || null
        };
      });

      console.log("Raw reviews count:", reviews.length);
      console.log("First review:", reviews[0]);

      // Validate that we have actual reviews before saving
      if (formattedReviews.length > 0 && formattedReviews[0].name !== "Anonymous") {
        fs.writeFileSync(
          path.join(dataDir, "reviews.json"),
          JSON.stringify(formattedReviews, null, 2)
        );
        console.log(`Successfully scraped ${formattedReviews.length} reviews and saved to src/data/reviews.json`);
      } else {
        console.warn("Scraped data appeared invalid or empty. Skipping save to preserve existing data.");
      }
    } else {
      console.error("No reviews found or error in scraper. Result:", reviews);
      
      // If scraper fails, we might want to at least create an empty or placeholder file
      // but it's better to let the user know.
    }
  } catch (error) {
    console.error("Error scraping reviews:", error);
  }
}

main();
