import About from "@/components/sections/About";
import Detail from "@/components/sections/Detail";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="pt-16 sm:pt-24">
      <About />
      <Detail />
      <Skills />
      <Projects />
      <Awards />
      <Archive />
      <Contact />
      <Footer />
    </main>
  );
}
