"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BombGamePage = dynamic(() => import("../../../game/bomb/page"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function WrappedBombGamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BombGamePage />
    </Suspense>
  );
}


