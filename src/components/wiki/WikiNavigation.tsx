"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WikiCategory } from './WikiData';

interface WikiNavigationProps {
  categories: WikiCategory[];
}

export default function WikiNavigation({ categories }: WikiNavigationProps) {
  const pathname = usePathname();

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, heading: string) => {
    e.preventDefault();
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
  };

  return (
    <nav className="w-64 p-4 bg-gray-50 dark:bg-gray-800 sticky top-24 transition-all duration-300 ease-in-out">
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <Link
            href={`/wiki/${category.name}`}
            className={`block text-lg font-semibold mb-2 ${
              pathname.startsWith(`/wiki/${category.name}`)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {category.name}
          </Link>
          
          {category.files.map((file) => (
            <div key={file.slug} className="ml-4">
              <a
                href={`#${file.slug}`}
                onClick={(e) => handleHeadingClick(e, file.slug)}
                className={`block py-1 ${
                  pathname === `/wiki/${category.name}/${file.slug}`
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {file.title}
              </a>
              
              {pathname === `/wiki/${category.name}/${file.slug}` && file.headings.map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading}`}
                  onClick={(e) => handleHeadingClick(e, heading)}
                  className="block py-1 ml-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {heading}
                </a>
              ))}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}