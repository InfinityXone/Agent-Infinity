
export function useCodex() {
  return typeof window !== 'undefined' && window?.CodexActive;
}
