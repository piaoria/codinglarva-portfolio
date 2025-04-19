"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { WikiCategory } from './WikiData';

interface WikiNavigationProps {
  categories: WikiCategory[];
}

export default function WikiNavigation({ categories }: WikiNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [targetHeading, setTargetHeading] = useState<string | null>(null);

  useEffect(() => {
    const currentCategory = pathname.split('/')[2];
    if (currentCategory) {
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.add(currentCategory);
        return newSet;
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (targetHeading) {
      const element = document.getElementById(targetHeading);
      if (element) {
        const headerOffset = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setTargetHeading(null);
      }
    }
  }, [pathname, targetHeading]);

  const toggleCategory = (e: React.MouseEvent, categoryName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, category: string, heading: string) => {
    e.preventDefault();
    
    if (!pathname.startsWith(`/wiki/${category}`)) {
      setTargetHeading(heading);
      router.push(`/wiki/${category}`);
    } else {
      const element = document.getElementById(heading);
      if (element) {
        const headerOffset = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="w-64 p-4 bg-gray-50 dark:bg-gray-800 sticky top-24 transition-all duration-300 ease-in-out">
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Link
              href={`/wiki/${category.name}`}
              onClick={(e) => {
                setExpandedCategories(prev => {
                  const newSet = new Set(prev);
                  newSet.add(category.name);
                  return newSet;
                });
              }}
              className={`flex-1 flex items-center justify-between text-lg font-semibold px-3 py-2 rounded-md transition-colors duration-200 ${
                pathname.startsWith(`/wiki/${category.name}`)
                  ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>{category.name}</span>
              <button
                onClick={(e) => toggleCategory(e, category.name)}
                className="relative z-10 px-2 py-1 -mr-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-transform duration-200"
              >
                <span className={`inline-block transition-transform duration-200 ${expandedCategories.has(category.name) ? 'rotate-0' : '-rotate-90'}`}>
                  ▼
                </span>
              </button>
            </Link>
          </div>
          
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedCategories.has(category.name) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="ml-4">
              {category.files.map((file) => (
                <div key={file.slug}>
                  <a
                    href={`#${file.slug}`}
                    onClick={(e) => handleHeadingClick(e, category.name, file.slug)}
                    className={`block py-1 transition-colors duration-200 ${
                      pathname === `/wiki/${category.name}/${file.slug}`
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {file.title}
                  </a>
                  
                  {pathname === `/wiki/${category.name}/${file.slug}` && (
                    <div className="transition-all duration-300 ease-in-out">
                      {file.headings.map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading}`}
                          onClick={(e) => handleHeadingClick(e, category.name, heading)}
                          className="block py-1 ml-4 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          {heading}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}