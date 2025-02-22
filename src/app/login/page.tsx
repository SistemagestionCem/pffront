import LoginForm from "@/components/LoginForm";
import PageTransition from "@/components/PageTransition";

export default function Page() {
  return (
    <PageTransition>
      <div className="text-white flex flex-col mt-[72px] gap-8 px-[5vw] py-8 container mx-auto max-w-xl">
        <h1 className="display3 text-center">Inicia sesión en tu cuenta</h1>
        <div className="space-y-6">
          <LoginForm />
        </div>
      </div>
    </PageTransition>
  );
}
