import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell active="home">
      <main
        id="hero"
        className="relative z-[2] flex flex-1 flex-col items-center justify-center text-center p-6 font-newsreader"
      >
        <h1 className="m-0 mb-6 text-[2em] leading-[1.3125] text-black max-[640px]:text-[1.625em] max-[640px]:leading-[1.3077] dark:text-[#f2f2f0]">
          Hi I&rsquo;m Jainil Parekh
        </h1>
        <p className="m-0 max-w-[862px] text-[1.75em] leading-[1.5] text-body-text max-[640px]:text-[1.25em] max-[640px]:leading-[1.6]">
          A <span className="text-rust">Behavioral Systems Designer</span>. I
          recognize the silent moments that users lose trust, drop out on
          activation, or are not retained. Then, I will re-design the whole
          system around them.
        </p>
      </main>
    </PageShell>
  );
}
