import RegisterForm from "../../components/RegisterForm";

export default function Page() {
  return (
    <div className="text-white flex flex-col mt-[72px] gap-8 px-[5vw] py-8 container mx-auto lg:max-w-[600px]">
      <h1 className="display3 text-center">Crea tu cuenta</h1>
      <section>
        <RegisterForm />
      </section>
    </div>
  );
}
