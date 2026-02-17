import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const getUtmPayload = (search: URLSearchParams) => ({
  utm_source: search.get('utm_source') ?? '',
  utm_medium: search.get('utm_medium') ?? '',
  utm_campaign: search.get('utm_campaign') ?? '',
});
