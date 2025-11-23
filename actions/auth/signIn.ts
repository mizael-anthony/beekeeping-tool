"use server";

import actionClient, { SafeError } from "@/lib/actions/safe-action-client";
import { SignInSchema } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";

export const signIn = actionClient
  .inputSchema(SignInSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const { email, password } = parsedInput;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new SafeError(error.message);
    }

    return {
      userId: data.user?.id ?? null,
    };
  });
