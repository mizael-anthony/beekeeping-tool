"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/actions/auth/signUp";
import { useForm } from "react-hook-form";
import { SignUpSchema, SignUp } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

export default function SignUpForm() {
  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { executeAsync, isExecuting } = useAction(signUp, {
    onSuccess: () => {
      toast.success("Compte créee avec succès!");
      // TODO: redirect to dashboard
    },
    onError: ({ error }) => {
      toast.error(
        error.serverError ||
          "Erreur lors de la modification de la photo de profil"
      );
    },
  });

  const onSubmit = async (data: SignUp) => {
    try {
      await executeAsync(data);
      form.reset({
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Error to create an account", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
          <Image
            src="/images/favicon-96x96.png"
            alt="Beekeeping Tool Logo"
            className="h-full w-full object-contain"
            width={64}
            height={64}
            priority
          />
        </div>
        <h2 className="text-3xl font-bold text-amber-900 mb-2">
          Créer un compte
        </h2>
        <p className="text-amber-700">
          Rejoignez Beekeeping Tool pour commencer à suivre votre rucher
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nom@exemple.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="votre mot de passe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-saisir le mot de passe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full transition-all duration-200">
            {isExecuting ? "Création..." : "Créer un compte"}
          </Button>
        </form>
      </Form>

      {/* <div className="mt-6 text-center">
        <p className="text-amber-700">
          Avez-vous déjà un compte?{" "}
          <Link
            href={"/sign-in"}
            className="text-amber-600 font-medium hover:text-amber-800 transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </div> */}
    </div>
  );
}
