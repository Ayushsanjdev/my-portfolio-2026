export default function PageHeader({ label, title }: { label: string; title: React.ReactNode }) {
  const heading = typeof title === 'string' && title.endsWith('.')
    ? <>{title.slice(0, -1)}<span className="page-period">.</span></>
    : title;

  return (
    <header className="page-header">
      <p className="section-index">{label}</p>
      <h1>{heading}</h1>
    </header>
  );
}
