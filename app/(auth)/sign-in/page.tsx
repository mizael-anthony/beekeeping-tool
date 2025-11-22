import SignInForm from '@/components/auth/sign-in-form';
import Loading from '@/components/ui/loading';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 animate-in fade-in duration-500">
      <div className="flex w-full max-w-sm flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium transition-transform hover:scale-105"
        >
          <Image
            src="/images/favicon-96x96.png"
            alt="BeeKeeping Logo"
            className="h-full w-full object-contain"
            width={64}
            height={64}
            priority
          />
          <span className="text-lg font-semibold">BeeKeeping</span>
        </Link>
        <Suspense fallback={<Loading/>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
