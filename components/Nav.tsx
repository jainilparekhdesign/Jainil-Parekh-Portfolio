import Link from "next/link";
import LogoMark from "./LogoMark";

type NavProps = {
  active: "home" | "projects";
};

export default function Nav({ active }: NavProps) {
  return (
    <nav className="relative z-[2] flex items-center justify-between h-[88px] px-[clamp(24px,8vw,120px)] py-5">
      <div className="font-newsreader flex items-center gap-2 text-[1.375em] whitespace-nowrap text-ink dark:text-[#f2f2f0]">
        <LogoMark className="h-10 w-auto text-blue" />
        Jainil Parekh
      </div>
      <div className="flex items-center gap-12 max-[640px]:gap-6 text-[0.875em] leading-[1.4286] whitespace-nowrap">
        <Link
          href="/"
          className={`relative no-underline transition-colors hover:text-nav-active dark:text-[#f2f2f0] dark:hover:text-nav-active ${
            active === "home"
              ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
              : "font-normal text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={`relative no-underline transition-colors hover:text-nav-active dark:text-[#f2f2f0] dark:hover:text-nav-active ${
            active === "projects"
              ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
              : "font-normal text-black"
          }`}
        >
          Projects
        </Link>
        <Link
          href="/#about"
          className="relative font-normal text-black no-underline transition-colors hover:text-nav-active dark:text-[#f2f2f0] dark:hover:text-nav-active"
        >
          About Me
        </Link>
        <Link
          href="/resume"
          className="relative font-normal text-black no-underline transition-colors hover:text-nav-active dark:text-[#f2f2f0] dark:hover:text-nav-active"
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
