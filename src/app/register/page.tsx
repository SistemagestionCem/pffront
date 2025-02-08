import RegisterForm from "../../components/RegisterForm"

export default function Page() {
  return (
    <div className="bg-black text-black min-h-screen flex flex-col">
  
      <section className="container mx-auto py-8 px-6">

        <RegisterForm />

      </section>
    </div>
  );
}