// Small inline icons for the storefront. Decorative: always aria-hidden.
const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};
export const SnowflakeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17" />
    <path d="m9.5 3.8 2.5 2 2.5-2M9.5 20.2l2.5-2 2.5 2" />
  </svg>
);
export const BoxIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m3 7.5 9-4.5 9 4.5v9L12 21l-9-4.5v-9Z" />
    <path d="m3 7.5 9 4.5 9-4.5M12 12v9" />
  </svg>
);
export const ShieldIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12 2.3 2.3 4.2-4.6" />
  </svg>
);
export const FlameIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21c4 0 6.5-2.6 6.5-6 0-3-2-4.6-3.2-7.2C14.4 6 14.2 4.6 14 3c-3.4 2.3-6.5 6-6.5 11 0 4 2 7 4.5 7Z" />
    <path d="M12 21c-1.7 0-2.8-1.2-2.8-2.9 0-1.6 1.2-2.4 2.8-4.1 1.6 1.7 2.8 2.5 2.8 4.1 0 1.7-1.1 2.9-2.8 2.9Z" />
  </svg>
);
export const TruckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3v3.5h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const BagIcon = (props) => (
  <svg {...base} strokeWidth={1.8} {...props}>
    <path d="M5 7h14l1 14H4L5 7Z" />
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
  </svg>
);
export const ArrowIcon = (props) => (
  <svg {...base} width={18} height={18} strokeWidth={2.2} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
