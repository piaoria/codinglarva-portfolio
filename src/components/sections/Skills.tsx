"use client";

import Image from "next/image";

export default function Skills() {
  const skills = {
    frontend: [
      { name: "HTML", icon: "/images/html-icon.png" },
      { name: "CSS", icon: "/images/css-icon.png" },
      { name: "JavaScript", icon: "/images/javascript-icon.png" },
      { name: "TypeScript", icon: "/images/typescript-icon.png" },
      { name: "React", icon: "/images/react-icon.png" },
      { name: "React Native", icon: "/images/reactnative-icon.png" },
      { name: "Next.js", icon: "/images/nextjs-icon.png" },
      { name: "Vue", icon: "/images/vue-icon.png" },
      { name: "Redux", icon: "/images/redux-icon.png" },
      { name: "Recoil", icon: "/images/recoil-icon.png" },
      { name: "Zustand", icon: "/images/zustand-icon.png" },
      { name: "React Query", icon: "/images/reactquery-icon.png" },
      { name: "Jest", icon: "/images/jest-icon.png" },
    ],
    programming: [{ name: "Python", icon: "/images/python-icon.png" }],
    dev: [
      { name: "Docker", icon: "/images/docker-icon.png" },
      { name: "Jenkins", icon: "/images/jenkins-icon.png" },
    ],
    design: [
      { name: "Figma", icon: "/images/figma-icon.png" },
      { name: "Notion", icon: "/images/notion-icon.png" },
      { name: "Jira", icon: "/images/jira-icon.png" },
      { name: "PowerPoint", icon: "/images/powerpoint-icon.png" },
    ],
  };

  return (
    <section id="skills" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-4xl sm:text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center">
        <span>SKILLS</span>
      </h2>

      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Frontend</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-4">
              {skills.frontend.map((skill) => (
                <div key={skill.name} className="w-12 h-12 relative">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Programming */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Programming</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-4">
              {skills.programming.map((skill) => (
                <div key={skill.name} className="w-12 h-12 relative">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dev */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Dev</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-4">
              {skills.dev.map((skill) => (
                <div key={skill.name} className="w-12 h-12 relative">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Design & Communication */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Design & Communication</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-4">
              {skills.design.map((skill) => (
                <div key={skill.name} className="w-12 h-12 relative">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
