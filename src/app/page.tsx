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
      <div className="pb-16 sm:pb-24">
        <About />
      </div>
      <div className="pb-16 sm:pb-24">
        <Detail />
      </div>
      <div className="pb-16 sm:pb-24">
        <Skills />
      </div>
      <div className="pb-16 sm:pb-24">
        <Projects />
      </div>
      <div className="pb-16 sm:pb-24">
        <Awards />
      </div>
      <div className="pb-16 sm:pb-24">
        <Archive />
      </div>
      <div className="pb-16 sm:pb-24">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
