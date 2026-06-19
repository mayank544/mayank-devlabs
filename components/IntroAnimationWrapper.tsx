"use client";

import { useEffect, useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";

export default function IntroAnimationWrapper() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setIntroDone(true);
    }, 1800);

    return () => window.clearTimeout(fallback);
  }, []);

  if (introDone) return null;

  return <IntroAnimation onComplete={() => setIntroDone(true)} />;
}
