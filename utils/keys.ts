export const STORAGE_KEYS = {
  AUTH_DATA: 'authData',
} as const;

export type StorageKeys = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
