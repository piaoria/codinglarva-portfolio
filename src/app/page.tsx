"use client";

import { useEffect, useRef } from "react";
import About from "@/components/sections/About";
import Detail from "@/components/sections/Detail";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useHeaderColor } from "@/contexts/HeaderColorContext";

export default function Home() {
  const { setHeaderColor } = useHeaderColor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    detail: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    awards: useRef<HTMLDivElement>(null),
    archive: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // 배경색이 다른 섹션에 도달했을 때 헤더 색상 변경
            if (["skills", "awards", "contact"].includes(sectionId)) {
              setHeaderColor("dark");
            } else {
              setHeaderColor("light");
            }
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    // 각 섹션 관찰 시작
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs, setHeaderColor]);

  return (
    <main className="pt-16 sm:pt-24">
      <div ref={sectionRefs.about} id="about">
        <About />
      </div>
      <div ref={sectionRefs.detail} id="detail" className="pb-16 sm:pb-24">
        <Detail />
      </div>
      <div
        ref={sectionRefs.skills}
        id="skills"
        className="bg-[var(--background-color2)]"
      >
        <Skills />
      </div>
      <div ref={sectionRefs.projects} id="projects" className="pb-16 sm:pb-24">
        <Projects />
      </div>
      <div
        ref={sectionRefs.awards}
        id="awards"
        className="bg-[var(--background-color2)]"
      >
        <Awards />
      </div>
      <div ref={sectionRefs.archive} id="archive" className="pb-16 sm:pb-24">
        <Archive />
      </div>
      <div
        ref={sectionRefs.contact}
        id="contact"
        className="bg-[var(--background-color2)]"
      >
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
