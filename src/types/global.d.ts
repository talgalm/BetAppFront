export {};

declare global {
  interface Window {
    google: typeof google;
  }

  // Declare only the 'google' identifier, no 'var'
  const google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: { credential: string }) => void;
        }) => void;
        prompt: () => void;
        renderButton?: (parent: HTMLElement, options: Record<string, unknown>) => void;
      };
    };
  };
}
