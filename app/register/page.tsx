'use client';
import React, { useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// ---------------------Import Internes -----------------------------
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import createUser from '../actions/createUser';

const Register = () => {
  // ---------------- Hooks -----------------------------
  const [data, action, isPending] = useActionState(createUser, undefined);

  const router = useRouter();

  // ---------------- use Effect -----------------------------
  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error, {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      if (data.success) {
        toast.success('Vous pouvez maintenant vous connecter', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push('/login');
      }
    }
  }, [data, router]);
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className="bg-tertiary shadow-xl w-full max-w-sm ">
        <div className="bg-accent relative mb-3 py-2">
          <h3 className="text-xl text-center !text-white ">Inscriptions</h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <form className="p-6" action={action}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-primary font-semibold mb-2"
            >
              Prénom & Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 bg-white w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-primary font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 bg-white w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-primary font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 bg-white w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="confirm-password"
              className="block text-primary font-semibold mb-2"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="border border-gray-300 bg-white w-full py-2 px-3"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <Button
              disabled={isPending}
              type="submit"
              variant={'outline'}
              className="h-10 text-secondray hover:text-white text-lg"
            >
              S&apos;inscrire
            </Button>

            <p>
              Vous avez déja un compte?
              <Link href="/login" className="text-accent font-semibold">
                {' '}
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
