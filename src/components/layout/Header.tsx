import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 px-8 flex items-center">
      <Logo />
      <ThemeSwitch />
      <div className="flex-1" />
      <div className="flex items-center gap-10">
        <button className="text-xl">
          <span className="text-[#F78535] font-black">A</span>
          <span className="font-thin">bout</span>
        </button>
        <button className="text-xl">
          <span className="text-[#F78535] font-black">S</span>
          <span className="font-thin">kills</span>
        </button>
        <button className="text-xl">
          <span className="text-[#F78535] font-black">P</span>
          <span className="font-thin">rojects</span>
        </button>
        <button className="text-xl">
          <span className="text-[#F78535] font-black">A</span>
          <span className="font-thin">wards</span>
        </button>
        <button className="text-xl">
          <span className="text-[#F78535] font-black">A</span>
          <span className="font-thin">rchive</span>
        </button>
        <button className="text-xl">
          <span className="text-[#F78535] font-black">C</span>
          <span className="font-thin">ontact</span>
        </button>
      </div>
    </header>
  );
}
