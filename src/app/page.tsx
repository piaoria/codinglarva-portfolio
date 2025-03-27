import About from "@/components/sections/About";
import Detail from "@/components/sections/Detail";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="pt-16 sm:pt-24">
      <div className="mb-12">
        <About />
      </div>
      <div className="mb-12">
        <Detail />
      </div>
      <div className="mb-12">
        <Skills />
      </div>
      <div className="mb-12">
        <Projects />
      </div>
      <div className="mb-12">
        <Awards />
      </div>
      <div className="mb-12">
        <Archive />
      </div>
      <div className="mb-12">
        <Contact />
      </div>
    </main>
  );
}
