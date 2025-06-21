// Fake hook: always “online”
export function useConnectionStatus() {
  return {
    backend: { isLoading: false, isError: false },
    dres:    { isLoading: false, isError: false }
  }
}

