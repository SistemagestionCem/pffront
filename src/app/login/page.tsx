import LoginForm from "../../components/LoginForm";

export default function Page() {
  return (
    <div className="text-white flex flex-col mt-[72px] gap-8 px-[5vw] py-8 container mx-auto lg:max-w-[500px]">
      <h1 className="display3 text-center">Inicia sesión en tu cuenta</h1>
      <div className="space-y-6">
        <LoginForm />
      </div>
    </div>
  );
}
