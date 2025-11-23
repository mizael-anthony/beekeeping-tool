"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { signOut } from "@/actions/auth/signOut";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

// TODO: Set connected user name
export default function Header() {
  const router = useRouter();
  const { executeAsync, isExecuting } = useAction(signOut, {
    onSuccess: () => {
      toast.success("Déconnexion réussie");
      router.push("/sign-in");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Erreur lors de la déconnexion.");
    },
  });

  const handleSignOut = async () => {
    try {
      await executeAsync();
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <header className="bg-white border-b border-amber-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 animate-bounce">
                        <Image
                          src="/images/favicon-96x96.png"
                          alt="Beekeeping Tool"
                          fill
                          className="object-contain"
                          sizes="40px"
                          priority
                        />
                      </div>
          <span className="text-xl font-bold text-amber-900">
            Beekeeping Tool
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-amber-700 hidden sm:inline">Carine</span>
          <Button variant="secondary" onClick={handleSignOut} disabled={isExecuting}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
