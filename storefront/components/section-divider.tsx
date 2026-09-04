export function SectionDivider({ number, title, light = false }: { number: string; title: string; light?: boolean }) {
  return <div className={`section-divider${light ? " section-divider-light" : ""}`} aria-label={`Section ${number}: ${title}`}>
    <span>{number}</span><strong>{title}</strong>
  </div>;
}
