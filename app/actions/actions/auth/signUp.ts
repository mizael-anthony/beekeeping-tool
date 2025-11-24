"use server";

import actionClient from "@/lib/actions/safe-action-client";
import { SignUpSchema } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";
import { SafeError } from "@/lib/actions/safe-action-client";

export const signUp = actionClient
  .inputSchema(SignUpSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const { email, password } = parsedInput;

    const { data, error } = await supabase.auth.signUp({
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
