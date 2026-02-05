"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const InfoMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return;
      if (event.target instanceof Node && ref.current.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="fixed z-50" style={{ bottom: 96, left: 24 }}>
      {open ? (
        <div className="mb-3 w-64 border border-black/30 bg-white px-4 py-3 text-[11px] tracking-[0.18em] text-joie-text/80">
          <div className="flex flex-col gap-2">
            <Link href="/legal" className="hover:text-joie-text">
              特定商取引法に基づく表記
            </Link>
            <Link href="/privacy" className="hover:text-joie-text">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: 52,
          height: 52,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          background: "#111",
          border: "none",
          padding: 0,
        }}
        aria-label="Information"
      >
        <span
          style={{
            width: 28,
            height: 28,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: "#fff",
            color: "#111",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          i
        </span>
      </button>
    </div>
  );
};
