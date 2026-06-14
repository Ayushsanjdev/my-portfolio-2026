'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visitors', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  return (
    <span style={{ color: 'var(--soft)', fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
      <span style={{ marginRight: 5, opacity: 0.6 }}>◎</span>
      {count === null ? '—' : count.toLocaleString()} visitors
    </span>
  );
}
