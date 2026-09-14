import Link from "next/link";
import LogoMark from "./LogoMark";

type NavProps = {
  active: "home" | "projects" | "resume";
};

export default function Nav({ active }: NavProps) {
  return (
    <nav className="relative z-[2] flex items-center justify-between h-[88px] px-[clamp(24px,8vw,120px)] py-5 print:hidden">
      <div className="font-newsreader flex items-center gap-2 text-nav-wordmark whitespace-nowrap text-ink">
        <LogoMark className="h-10 w-auto text-blue" />
        <span className="max-[480px]:hidden">Jainil Parekh</span>
      </div>
      <div className="flex items-center gap-12 max-[640px]:gap-4 text-ui whitespace-nowrap">
        <Link
          href="/"
          className={`relative no-underline transition-colors hover:text-nav-active ${
            active === "home"
              ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
              : "font-normal text-ink"
          }`}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={`relative no-underline transition-colors hover:text-nav-active ${
            active === "projects"
              ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
              : "font-normal text-ink"
          }`}
        >
          Projects
        </Link>
        <Link
          href="/#about"
          className="relative font-normal text-ink no-underline transition-colors hover:text-nav-active max-[640px]:hidden"
        >
          About Me
        </Link>
        <Link
          href="/resume"
          className={`relative no-underline transition-colors hover:text-nav-active ${
            active === "resume"
              ? "font-medium text-nav-active after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-px after:bg-blue"
              : "font-normal text-ink"
          }`}
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
