import { Newsreader } from "next/font/google";
import PageShell from "@/components/PageShell";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <PageShell active="home">
      <main
        id="hero"
        className="relative z-[2] flex flex-1 flex-col items-center justify-center text-center p-6 font-newsreader"
      >
        <div className="mb-10 grid w-full max-w-[900px] grid-cols-1 gap-10 sm:grid-cols-2 sm:divide-x sm:divide-toolbar-outline">
          <div className="flex flex-col items-center gap-3">
            <span className="font-geist-mono text-caption tracking-[0.04em] text-blue uppercase">
              New — v3.0 spec
            </span>
            <h1 className="m-0 text-greeting text-ink">
              Hi I&rsquo;m Jainil Parekh
            </h1>
            <p className="font-geist-mono text-caption text-body-text">
              Figtree (primary) · Geist Mono (secondary)
            </p>
            <div className="mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-4 w-4 rounded-full border border-toolbar-outline"
                  style={{ background: "#F8F8F6" }}
                />
                <span className="font-geist-mono text-caption text-body-text">
                  Snow bg
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full border border-toolbar-outline bg-blue" />
                <span className="font-geist-mono text-caption text-body-text">
                  Forest accent
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:pl-2">
            <span className="font-geist-mono text-caption tracking-[0.04em] text-rust uppercase">
              Old — previous spec
            </span>
            <h1
              className={`m-0 text-[2em] leading-[1.3125] text-ink max-[640px]:text-[1.625em] max-[640px]:leading-[1.3077] ${newsreader.className}`}
            >
              Hi I&rsquo;m Jainil Parekh
            </h1>
            <p className="font-geist text-caption text-body-text">
              Newsreader (headings) · Geist (body)
            </p>
            <div className="mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-4 w-4 rounded-full border border-toolbar-outline"
                  style={{ background: "#F8F8F6" }}
                />
                <span className="font-geist-mono text-caption text-body-text">
                  Snow bg
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-4 w-4 rounded-full border border-toolbar-outline"
                  style={{ background: "#1F38A8" }}
                />
                <span className="font-geist-mono text-caption text-body-text">
                  Cobalt accent
                </span>
              </span>
            </div>
          </div>
        </div>

        <p className="m-0 max-w-[862px] text-lede text-body-text">
          A <span className="t-emphasis">Behavioral Systems Designer</span>. I
          recognize the silent moments that users lose trust, drop out on
          activation, or are not retained. Then, I will re-design the whole
          system around them.
        </p>
      </main>
    </PageShell>
  );
}
