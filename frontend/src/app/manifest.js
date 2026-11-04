export default function manifest() {
  return {
    name: "Wave of Bengal",
    short_name: "Wave of Bengal",
    description: "Your next good meal, from coast to table.",
    id: "/",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    background_color: "#06262c",
    theme_color: "#06262c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
