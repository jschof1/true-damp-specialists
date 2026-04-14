import { fallbackReviews } from "./fallbackReviews";
import reviewsData from "./reviews.json";

/**
 * Reviews in reviews.json should be client-approved public copy or clearly-labeled
 * paraphrase themes. Avoid inventing verbatim testimonials.
 */
export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  verified: boolean;
  avatar?: string | null;
}

// Helper to check if reviews are valid (not empty, has items)
const isValid = (data: unknown): data is Review[] => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === "object" &&
    data[0] !== null &&
    "name" in data[0] &&
    (data[0] as Review).name !== "Anonymous"
  );
};

// Export the best available data (never null: empty JSON -> fallback)
const raw = reviewsData ?? [];
const hasRealReviews = isValid(raw);
export const reviews: Review[] = hasRealReviews ? (raw as Review[]) : fallbackReviews;

/**
 * Rating and count fields stay generic until the client confirms the exact public-review
 * wording they want surfaced on the site.
 */
const DISPLAY_RATING = "5.0";

/**
 * Review stats for display. Keep values stable so the UI never renders empty states.
 */
export const reviewStats = {
  averageRating: DISPLAY_RATING,
  totalReviews: hasRealReviews ? `${reviews.length}` : "4",
  verifiedCount: hasRealReviews ? `${reviews.filter((r) => r.verified).length}` : "0",
  ratingLabel: "Public Review Profile",
  reviewsAvailableLabel: "View Public Profile",
};
