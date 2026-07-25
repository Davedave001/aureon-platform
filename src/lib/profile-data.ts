export const profile = {
  name: "David O.",
  seed: "david-o-aureon",
  handle: "@davidO",
  role: "Trader · Premium Member",
  verified: true,
  location: "London, UK",
  joined: "Joined January 2024",
  bio: "Multi-asset trader focused on macro and crypto. Building AI-assisted strategies and sharing what works. Long-term believer in disciplined risk management over hero trades.",
  stats: [
    { label: "Posts", value: "148" },
    { label: "Followers", value: "2.3K" },
    { label: "Following", value: "312" },
    { label: "Reputation", value: "4.8" },
  ],
  interests: ["Forex", "Crypto", "Macro", "Options", "Risk Management", "AI Trading"],
  skills: [
    { label: "Technical Analysis", level: 90 },
    { label: "Risk Management", level: 82 },
    { label: "Algo Strategy", level: 68 },
    { label: "Fundamental Analysis", level: 74 },
  ],
};

export const verificationItems = [
  { label: "Trading Track Record", status: "Approved" as const },
  { label: "Broker Statements", status: "Approved" as const },
  { label: "Identity (KYC)", status: "Approved" as const },
  { label: "Community Username (Skool)", status: "Pending" as const },
];

export const membershipSummary = {
  plan: "Premium Plan",
  status: "Active" as const,
  renews: "Renews Jun 15, 2024",
  perks: ["News Terminal Access", "AI Research Assistant", "Priority Support"],
};
