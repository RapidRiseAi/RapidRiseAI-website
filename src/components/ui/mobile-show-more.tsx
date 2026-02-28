'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function MobileShowMoreList({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, 4);

  return (
    <>
      <div className="grid gap-3 max-md:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <div
            key={item}
            className="flex min-h-9 items-center gap-2 rounded-[14px] border border-stroke/80 bg-[color:color-mix(in_srgb,var(--bg-2)_76%,transparent)] px-3 py-2 text-[13px] leading-[1.3] text-text1 shadow-[0_8px_20px_rgba(0,0,0,0.2)] max-md:shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      {items.length > 4 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 min-h-11 rounded-full border border-stroke px-4 py-2 text-sm font-medium text-text1 transition hover:text-text0 md:hidden"
        >
          {expanded ? 'Show less' : 'Show all'}
        </button>
      ) : null}
    </>
  );
}
