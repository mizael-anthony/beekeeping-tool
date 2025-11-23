"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/actions/auth/signIn";
import { SignIn, SignInSchema } from "@/types/auth";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { executeAsync, isExecuting } = useAction(signIn, {
    onSuccess: () => {
      toast.success("Connexion réussie !");
      router.push("/dashboard");
    },
    onError: ({ error }) => {
      toast.error(
        error.serverError || "Erreur lors de la connexion. Veuillez réessayer."
      );
    },
  });

  const onSubmit = async (data: SignIn) => {
    try {
      await executeAsync(data);
    } catch (error) {
      console.error("Error while signing in", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-4">
        <Button
          asChild
          variant="ghost"
          className="px-0 text-amber-700 hover:text-amber-900"
        >
          <Link href="/">← Retour à l&apos;accueil</Link>
        </Button>
      </div>

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
        <h2 className="text-3xl font-bold text-amber-900 mb-2">Bienvenue</h2>
        <p className="text-amber-700">
          Connectez-vous pour accéder à vos rapports apicoles
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
                    placeholder="Saisir votre mot de passe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full transition-all duration-200">
            {isExecuting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-amber-700">
          Pas encore de compte ?{" "}
          <Link
            href={"/sign-up"}
            className="text-amber-600 font-medium hover:text-amber-800 transition-colors"
          >
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
