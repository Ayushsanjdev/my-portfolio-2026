import PageHeader from '@/components/PageHeader';
import RevealBlock from '@/components/RevealBlock';

const skillGroups = [
  { label: 'Languages',    items: [{ t: 'JavaScript', hi: true }, { t: 'TypeScript', hi: true }] },
  { label: 'Frameworks',   items: [{ t: 'React.js', hi: true }, { t: 'React Native', hi: true }, { t: 'Next.js', hi: true }, { t: 'Node.js' }, { t: 'Framer' }] },
  { label: 'State & Data', items: [{ t: 'Zustand' }, { t: 'React Query' }, { t: 'Redux Toolkit' }] },
  { label: 'Styling',      items: [{ t: 'Tailwind CSS' }, { t: 'MUI' }] },
  { label: 'Testing',      items: [{ t: 'Vitest' }, { t: 'Jest' }] },
  { label: 'Platforms',    items: [{ t: 'iOS' }, { t: 'Android' }, { t: 'Web' }] },
];

export default function Skills() {
  return (
    <div className="page">
      <PageHeader label="05 / Skills" title="What I work with." />
      <div className="detail-list">
        {skillGroups.map(({ label, items }) => (
          <RevealBlock delay={0.05} className="skill-row" key={label}>
            <span className="detail-label">{label}</span>
            <div className="skill-items">
              {items.map(({ t, hi }) => (
                <span className={hi ? 'skill-item skill-item--primary' : 'skill-item'} key={t}>{t}</span>
              ))}
            </div>
          </RevealBlock>
        ))}
      </div>
    </div>
  );
}
