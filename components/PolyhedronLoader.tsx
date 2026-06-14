'use client';

import dynamic from 'next/dynamic';

const PolyhedronScene = dynamic(() => import('./PolyhedronScene'), { ssr: false });

export default function PolyhedronLoader() {
  return <PolyhedronScene />;
}
