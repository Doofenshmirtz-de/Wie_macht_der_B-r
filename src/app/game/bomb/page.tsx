"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function BombGamePage() {
  useEffect(() => {
    // Redirect to the localized version
    redirect("/de/game/bomb");
  }, []);

  return <div>Redirecting...</div>;
}
