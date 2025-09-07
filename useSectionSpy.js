"use client";
import { useEffect, useState } from "react";

export function useSectionSpy(ids) {
  const [active, setActive] = useState(ids?.[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = en.target.getAttribute("id");
          if (id) setActive(id);
        }
      }),
      { threshold: 0.5 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}
