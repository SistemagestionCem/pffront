import RegisterForm from "../../components/RegisterForm";
import PageTransition from "@/components/PageTransition";

export default function Page() {
  return (
    <PageTransition>
      <div className="container mx-auto mt-[72px]">
        <div className="text-white mx-auto flex flex-col gap-8 px-[5vw] py-8 lg:max-w-[600px]">
          <h1 className="display3 text-center">Crea tu cuenta</h1>
          <section>
            <RegisterForm />
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
