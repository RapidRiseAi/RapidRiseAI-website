'use client';

export function Toast({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) {
  return <div className={`rounded-button border px-4 py-3 text-sm ${type === 'success' ? 'border-green-400/40 bg-green-500/15 text-green-200' : 'border-red-400/40 bg-red-500/15 text-red-200'}`}>{message}</div>;
}
