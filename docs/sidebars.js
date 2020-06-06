module.exports = {
  someSidebar: [
    {
      type: "category",
      label: "Installation",
      items: ["introduction", "getting-started", "setup"],
    },
    {
      type: "category",
      label: "Configuration",
      items: [
        "configuration",
        "queries",
        "logging",
        "cache",
        "devices",
        "commands",
        "ui",
        "api",
        "messages",
        "structured-data",
      ],
    },
    {
      type: "category",
      label: "Linux Agent",
      items: ["agent/installation", "agent/setup"],
    },
    { type: "doc", id: "production" },
    { type: "doc", id: "upgrading" },
    { type: "doc", id: "platforms" },
    { type: "doc", id: "license" },
  ],
};
