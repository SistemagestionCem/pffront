/* eslint-disable */
'use client';
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import userDataStorage, { UserData } from "@/storage/userStore";
import { useSearchParams } from "next/navigation"; // Mantén useSearchParams
import LoginForm from "@/components/LoginForm";

const PageContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUserData = userDataStorage((state) => state.setUserData);
  const searchParams = useSearchParams();
  const useParam = searchParams.get("user");

  useEffect(() => {
    if (useParam) {
      const userData: UserData = JSON.parse(useParam);
      setUserData(userData);
      toast.success("¡Inicio de sesión exitoso!", {
        duration: 3000,
        position: "top-center",
      });
      router.push("/dashboard");
    }
  }, [useParam]);

  const handleGoogleLogin = async () => {
    window.location.href = 'https://pfback-osdi.onrender.com/auth/google';
  };

  return (
    <div className="text-white flex flex-col mt-[72px] gap-8 px-[5vw] py-8 container mx-auto max-w-xl">
      <h1 className="display3 text-center">Inicia sesión en tu cuenta</h1>
      <div className="space-y-6">
        <LoginForm />

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] flex-1 bg-white/20"></div>
            <span className="text-white/60 text-subtitle2">
              O continúa con
            </span>
            <div className="h-[1px] flex-1 bg-white/20"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-white/20 rounded-[16px] hover:bg-white/10 transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : (
              <>
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-white text-subtitle2">
                  Continuar con Google
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PageContent />
    </Suspense>
  );
}
