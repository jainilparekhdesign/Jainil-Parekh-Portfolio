export default function ScrollIndicator() {
  return (
    <div
      className="absolute z-[2] left-1/2 bottom-[51px] w-6 h-6 -translate-x-1/2 text-ink"
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block"
      >
        <rect x="5" y="2" width="14" height="20" rx="7" />
        <path
          d="M12 6v4"
          className="animate-scroll-dot [transform-box:fill-box] [transform-origin:center]"
        />
      </svg>
    </div>
  );
}
