import LoginForm from "../components/LoginForm";
import NavBar from "../components/navBar";

export default function Page() {
  return (
    <div className="bg-black text-black min-h-screen flex flex-col">
        <div>
            <NavBar/>
        </div>
      <section className="mx-auto py-8 px-6">
        <LoginForm />
      </section>
      
    </div>
  );
}