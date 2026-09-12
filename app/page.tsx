import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell active="home">
      <main
        id="hero"
        className="relative z-[2] flex flex-1 flex-col items-center justify-center text-center p-6 font-newsreader"
      >
        <div className="mb-2 flex flex-col items-center gap-1">
          <span className="font-geist-mono text-caption tracking-[0.04em] text-blue uppercase">
            New — v3.0 spec
          </span>
          <h1 className="m-0 text-greeting text-ink">
            Hi I&rsquo;m Jainil Parekh
          </h1>
        </div>

        <div className="mt-10 mb-6 flex flex-col items-center gap-1">
          <span className="font-geist-mono text-caption tracking-[0.04em] text-rust uppercase">
            Old — previous size
          </span>
          <h1 className="m-0 text-[2em] leading-[1.3125] text-ink max-[640px]:text-[1.625em] max-[640px]:leading-[1.3077]">
            Hi I&rsquo;m Jainil Parekh
          </h1>
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
