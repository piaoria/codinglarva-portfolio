"use client";

import { useEffect, useState } from "react";

interface TableOfContentsProps {
  headings: string[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-96px 0px -40% 0px" }
    );

    document.querySelectorAll("h2").forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-24 h-fit w-64 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <h2 className="mb-4 text-lg font-bold">목차</h2>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const id = heading.toLowerCase().replace(/\s+/g, "-");
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {heading}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
