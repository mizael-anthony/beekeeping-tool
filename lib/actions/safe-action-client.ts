import { createSafeActionClient } from 'next-safe-action';

export class SafeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const actionClient = createSafeActionClient({
  handleServerError: (err: Error) => {
    if (err instanceof SafeError) {
      return err.message;
    }
    return "Une erreur s'est produite";
  },
});

export default actionClient;
