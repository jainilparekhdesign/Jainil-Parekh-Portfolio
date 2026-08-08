import Image from "next/image";

type PhoneMockupProps = {
  screenshotSrc: string;
  alt: string;
  className?: string;
};

export default function PhoneMockup({
  screenshotSrc,
  alt,
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={`relative rounded-[46px] border-2 border-[#ff904b] p-[3px] ${className}`}
    >
      <div className="relative aspect-[222/484] w-full overflow-hidden rounded-[40px] border-[3px] border-black bg-black">
        <Image
          src={screenshotSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 45vw, 260px"
          className="object-cover"
        />
        <div className="absolute top-[10px] left-1/2 h-[20px] w-[68px] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute bottom-[6px] left-1/2 h-[3px] w-[80px] -translate-x-1/2 rounded-full bg-white" />
      </div>
    </div>
  );
}
