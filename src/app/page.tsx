"use client";

import { useEffect, useRef, useState } from "react";
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
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const headerObserverRef = useRef<IntersectionObserver | null>(null);
  const fadeObserverRef = useRef<IntersectionObserver | null>(null);

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    detail: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    awards: useRef<HTMLDivElement>(null),
    archive: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // 헤더 색상 변경을 위한 observer
  useEffect(() => {
    const handleHeaderIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (["skills", "awards", "contact"].includes(sectionId)) {
            setHeaderColor("dark");
          } else {
            setHeaderColor("light");
          }
        }
      });
    };

    headerObserverRef.current = new IntersectionObserver(
      handleHeaderIntersection,
      {
        threshold: 0.3,
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        headerObserverRef.current?.observe(ref.current);
      }
    });

    return () => {
      headerObserverRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHeaderColor]);

  // 섹션 페이드인을 위한 observer
  useEffect(() => {
    const handleFadeIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (!visibleSections.includes(sectionId)) {
            setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
            fadeObserverRef.current?.unobserve(entry.target);
          }
        }
      });
    };

    fadeObserverRef.current = new IntersectionObserver(handleFadeIntersection, {
      threshold: 0.3,
    });

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        fadeObserverRef.current?.observe(ref.current);
      }
    });

    return () => {
      fadeObserverRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSections]);

  return (
    <div className="min-h-screen">
      <main className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] pt-16 sm:pt-24">
        <div
          ref={sectionRefs.about}
          id="about"
          className={`section-fade-in ${visibleSections.includes("about") ? "visible" : ""}`}
        >
          <About />
        </div>
        <div
          ref={sectionRefs.detail}
          id="detail"
          className={`section-fade-in pb-16 sm:pb-24 ${visibleSections.includes("detail") ? "visible" : ""}`}
        >
          <Detail />
        </div>
        <div
          ref={sectionRefs.skills}
          id="skills"
          className={`section-fade-in bg-[var(--background-color2)] ${visibleSections.includes("skills") ? "visible" : ""}`}
        >
          <Skills />
        </div>
        <div
          ref={sectionRefs.projects}
          id="projects"
          className={`section-fade-in pb-16 sm:pb-24 ${visibleSections.includes("projects") ? "visible" : ""}`}
        >
          <Projects />
        </div>
        <div
          ref={sectionRefs.awards}
          id="awards"
          className={`section-fade-in bg-[var(--background-color2)] ${visibleSections.includes("awards") ? "visible" : ""}`}
        >
          <Awards />
        </div>
        <div
          ref={sectionRefs.archive}
          id="archive"
          className={`section-fade-in pb-16 sm:pb-24 ${visibleSections.includes("archive") ? "visible" : ""}`}
        >
          <Archive />
        </div>
        <div
          ref={sectionRefs.contact}
          id="contact"
          className={`section-fade-in bg-[var(--background-color2)] ${visibleSections.includes("contact") ? "visible" : ""}`}
        >
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
