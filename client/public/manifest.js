const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["logo.png", "logo.png", "logo.svg"],
  manifest: {
    name: "CampusGo",
    short_name: "campus-go",
    description: "Ride payment made easy for all students",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/logo.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#3F713E",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
