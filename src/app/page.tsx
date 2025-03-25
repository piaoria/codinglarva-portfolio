import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="pt-16 sm:pt-24">
      <About />
      <Skills />
      <Projects />
      <Awards />
      <Archive />
      <Contact />
    </main>
  );
}
