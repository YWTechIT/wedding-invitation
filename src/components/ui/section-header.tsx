import type { SectionHeaderProps } from "./types";

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* text-indent balances the trailing letter-spacing so the text stays centered. */}
      <p className="indent-[5px] font-serif text-[13px] tracking-[5px] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[22px] leading-8 tracking-[-0.3px]">{title}</h2>
    </header>
  );
}
