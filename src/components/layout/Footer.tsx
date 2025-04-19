import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-[var(--box-color)]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <a
              href="https://github.com/piaoria"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity hover:[filter:invert(0.4)_sepia(1)_saturate(3)_hue-rotate(340deg)]"
            >
              <Image
                src="/svgs/github-icon.svg"
                alt="Github Icon"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://codinglarva.tistory.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity hover:[filter:invert(0.4)_sepia(1)_saturate(3)_hue-rotate(340deg)]"
            >
              <Image
                src="/svgs/tistory-icon.svg"
                alt="Tistory Icon"
                width={28}
                height={28}
                className="w-7 h-7"
              />
            </a>
            <a
              href="https://solved.ac/codinglarva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity hover:[filter:invert(0.4)_sepia(1)_saturate(3)_hue-rotate(340deg)]"
            >
              <Image
                src="/svgs/baekjoon-icon.svg"
                alt="Baekjoon Icon"
                width={30}
                height={30}
                className="w-7.5 h-7.5"
              />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 CodingLarva. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
