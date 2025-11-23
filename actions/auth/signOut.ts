"use server";

import actionClient, { SafeError } from "@/lib/actions/safe-action-client";
import { createClient } from "@/lib/supabase/server";

export const signOut = actionClient.action(async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new SafeError(error.message);
    }

    return { success: true };
  } catch (err) {
    console.error("Sign-out error:", err);

    if (err instanceof SafeError) {
      throw err;
    }

    const message =
      err instanceof Error
        ? err.message
        : "Une erreur inconnue est survenue lors de la déconnexion.";

    throw new SafeError(message);
  }
});
