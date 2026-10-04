export const projects = [
  { id: "aurora", name: "Aurora Commerce", description: "Production APIs for storefront and checkout.", status: "Healthy", created: "Mar 12, 2025", requests: "284.6K", region: "EU West" },
  { id: "atlas", name: "Atlas Mobile", description: "User profiles, messaging, and media services.", status: "Healthy", created: "Feb 24, 2025", requests: "91.2K", region: "US East" },
  { id: "pulse", name: "Pulse Analytics", description: "Event ingestion and reporting workspace.", status: "Paused", created: "Jan 08, 2025", requests: "32.8K", region: "US West" },
];

export const activity = [
  { method: "GET", endpoint: "/v1/products", status: 200, time: "112ms", when: "2 min ago" },
  { method: "POST", endpoint: "/v1/orders", status: 201, time: "284ms", when: "8 min ago" },
  { method: "GET", endpoint: "/v1/users/me", status: 200, time: "96ms", when: "14 min ago" },
  { method: "PATCH", endpoint: "/v1/orders/8821", status: 400, time: "143ms", when: "21 min ago" },
];

export const chartData = [
  { day: "Mon", requests: 18200, errors: 410 }, { day: "Tue", requests: 24100, errors: 620 },
  { day: "Wed", requests: 21800, errors: 390 }, { day: "Thu", requests: 31200, errors: 710 },
  { day: "Fri", requests: 28600, errors: 530 }, { day: "Sat", requests: 19400, errors: 330 },
  { day: "Sun", requests: 26800, errors: 480 },
];
