'use client';

export function Toast({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) {
  return <div className={`rounded-button px-4 py-3 text-sm ${type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{message}</div>;
}
