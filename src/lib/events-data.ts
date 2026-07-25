export const discoverCategories = [
  { label: "Webinars", count: "124 Events", icon: "mdi:webcam" },
  { label: "Meetups", count: "86 Events", icon: "mdi:account-group" },
  { label: "Workshops", count: "52 Events", icon: "mdi:tools" },
  { label: "Trading Competitions", count: "18 Events", icon: "mdi:trophy-outline" },
  { label: "Networking", count: "64 Events", icon: "mdi:handshake-outline" },
];

export const upcomingEvents = [
  {
    id: "ai-in-trading",
    title: "AI in Trading: Building Smarter Strategies",
    type: "Webinar",
    date: "MAY 28",
    time: "7:00 PM GMT+1",
    location: "Online",
    price: "Free",
    attending: "1.2K attending",
    image: "aiAbstractTech" as const,
    featured: true,
  },
  {
    id: "london-meetup",
    title: "London Traders Meet & Greet",
    type: "Meetup",
    date: "JUN 08",
    time: "6:00 PM GMT+1",
    location: "London, UK",
    price: "$25",
    attending: "86 attending",
    image: "businessMeeting" as const,
  },
  {
    id: "options-workshop",
    title: "Options Trading Workshop",
    type: "Workshop",
    date: "JUN 15",
    time: "10:00 AM GMT+1",
    location: "New York, USA",
    price: "$149",
    attending: "42 attending",
    image: "tradingChartsScreen" as const,
  },
  {
    id: "championship-2024",
    title: "Aureon Trading Championship 2024",
    type: "Trading Competition",
    date: "JUL 01",
    time: "Jul 1 – Jul 31",
    location: "Online",
    price: "$99",
    attending: "356 registered",
    image: "cryptoCoins" as const,
  },
  {
    id: "networking-night",
    title: "Networking Night: Finance Professionals",
    type: "Networking",
    date: "JUN 22",
    time: "6:30 PM GMT+1",
    location: "Dubai, UAE",
    price: "$35",
    attending: "64 attending",
    image: "conferenceEvent" as const,
  },
];

export const selectedEvent = {
  ...upcomingEvents[0],
  about:
    "This webinar is designed for traders, investors, and finance professionals who want to leverage AI to gain a competitive edge in today's markets.",
  agenda: [
    { time: "7:00 PM", item: "Welcome & Introduction" },
    { time: "7:15 PM", item: "AI Trends in Financial Markets" },
    { time: "7:45 PM", item: "Building AI-Powered Trading Strategies" },
    { time: "8:15 PM", item: "Risk Management with Machine Learning" },
    { time: "8:45 PM", item: "Live Q&A Session" },
    { time: "9:15 PM", item: "Closing Remarks" },
  ],
  speakers: [
    { name: "Dr. Sarah Chen", title: "AI Research Lead, Aureon Capital AI", seed: "sarah-chen-speaker" },
    { name: "Michael Thompson", title: "Quantitative Analyst & AI Strategist", seed: "michael-thompson-speaker" },
  ],
  sponsors: [
    { name: "Aureon Capital AI", tier: "Platinum" },
    { name: "Nova Markets", tier: "Gold" },
    { name: "Vertex Analytics", tier: "Gold" },
    { name: "Quantum Ledger", tier: "Silver" },
  ],
};

export const eventTabs = ["Overview", "Agenda", "Speakers", "Sponsors", "Attendees"] as const;

export const myTickets = [
  { title: "AI in Trading: Building Smarter Strategies", date: "May 28, 2024", location: "Online", image: "aiAbstractTech" as const },
  { title: "London Traders Meet & Greet", date: "Jun 8, 2024", location: "London, UK", image: "businessMeeting" as const },
  { title: "Options Trading Workshop", date: "Jun 15, 2024", location: "New York, USA", image: "tradingChartsScreen" as const },
];

export const ticketTabs = ["Upcoming", "Past", "Cancelled"] as const;

export const organizerTabs = ["Create Event", "My Events", "Orders", "Analytics"] as const;

export const eventCategories = ["Webinar", "Meetup", "Workshop", "Trading Competition", "Networking"];
export const eventTypes = ["Free", "Paid"];
