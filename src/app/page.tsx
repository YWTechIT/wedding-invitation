import { SectionHeader } from "@/components/ui/section-header";
import { WEDDING } from "@/config/wedding";

export default function Home() {
  const { cover, sections } = WEDDING;

  return (
    <main>
      <section id="cover" className="px-6 pt-22 pb-20">
        <SectionHeader
          eyebrow={cover.eyebrow}
          title={cover.headingLines.join(" ")}
        />
      </section>
      {sections.map(({ id, eyebrow, title }) => (
        <section key={id} id={id} className="px-6 pt-22 pb-20">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </section>
      ))}
    </main>
  );
}
