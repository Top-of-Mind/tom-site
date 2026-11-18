import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Playbooks from "@/components/Playbooks";
import Partners from "@/components/Partners";
import Process from "@/components/Process";
// import Testimonials from "@/components/Testimonials";
import Focus from "@/components/Focus";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Playbooks />
      <Partners />
      <Process />
      {/* <Testimonials /> */}
      <Focus />
      <Contact />
      <Footer />
    </main>
  );
}
