/**
 * Normalizes a UK phone number to +44 international format.
 * Handles various input formats:
 * - 07xxx xxx xxx → +447xxx xxx xxx
 * - 447xxx xxx xxx → +447xxx xxx xxx
 * - +447xxx xxx xxx → +447xxx xxx xxx (unchanged)
 * - 0044 7xxx → +447xxx
 */
export function normalizeUKPhone(phone: string): string {
  // Remove all non-digit characters except leading +
  const cleaned = phone.replace(/[^\d+]/g, "");
  
  // If it starts with +44, it's already correct
  if (cleaned.startsWith("+44")) {
    return cleaned;
  }
  
  // If it starts with 0044, replace with +44
  if (cleaned.startsWith("0044")) {
    return "+44" + cleaned.slice(4);
  }
  
  // If it starts with 44 (without +), add the +
  if (cleaned.startsWith("44") && cleaned.length >= 12) {
    return "+" + cleaned;
  }
  
  // If it starts with 0, replace with +44
  if (cleaned.startsWith("0")) {
    return "+44" + cleaned.slice(1);
  }
  
  // If it's just digits (like 7494342754), prepend +44
  if (/^\d+$/.test(cleaned) && cleaned.length >= 10) {
    return "+44" + cleaned;
  }
  
  // Fallback: prepend +44 if not already there
  return "+44" + cleaned;
}
