'use client';

import dynamic from 'next/dynamic';
import { MapsSkeleton } from './skeleton/maps-skeleton';

export const MapsWrapper = dynamic(
  () => import('./maps').then((mod) => mod.Maps),
  {
    ssr: false,
    loading: () => <MapsSkeleton />,
  },
);
