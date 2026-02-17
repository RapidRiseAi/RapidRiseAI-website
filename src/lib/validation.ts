export const isEmail = (v: string) => /.+@.+\..+/.test(v);
export const isWhatsapp = (v: string) => /^\+?[0-9\s-]{8,20}$/.test(v);
export const required = (v: string) => v.trim().length > 0;
