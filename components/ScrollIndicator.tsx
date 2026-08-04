export default function ScrollIndicator() {
  return (
    <div
      className="absolute z-[2] left-1/2 bottom-[51px] w-6 h-6 -translate-x-1/2"
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="block">
        <path
          d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8V14C1 17.866 4.13401 21 8 21C11.866 21 15 17.866 15 14V8Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 5V9"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scroll-dot [transform-box:fill-box] [transform-origin:center]"
        />
      </svg>
    </div>
  );
}
