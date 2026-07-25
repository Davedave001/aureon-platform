/**
 * Copyright-free imagery for the platform.
 *
 * - Photos: direct Unsplash CDN links (Unsplash License — free for commercial
 *   and noncommercial use, no permission or attribution required).
 * - Avatars: DiceBear (open-source, generated SVG avatars) — used instead of
 *   real headshots so mock "mentors"/"traders" never imply a real person.
 */

function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&auto=format&fit=crop&q=80`;
}

export const stockPhotos = {
  aiRobotMarkets: unsplash("1620712943543-bcc4688e7485"),
  cryptoCoins: unsplash("1611974789855-9c2a0a7236a3"),
  bitcoinCloseup: unsplash("1591696205602-2f950c417cb9"),
  stockScreens: unsplash("1518186285589-2f7649de83e0"),
  tradingChartsScreen: unsplash("1590283603385-17ffb3a7f29f"),
  aiAbstractTech: unsplash("1639762681485-074b7f938ba0"),
  conferenceEvent: unsplash("1540575467063-178a50c2df87"),
  businessMeeting: unsplash("1526304640581-d334cdbbf45e"),
};

export function dicebearAvatar(seed: string, style: "notionists" | "glass" = "notionists") {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
}
