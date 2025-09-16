import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useThemeSwitch } from "../context/ColorMode";
const NavBar = () => {
  const { isDark, toggleTheme } = useThemeSwitch();

  return (
    <nav className="w-full flex flex-row justify-between shadow-md bg-card pl-10 border-b card-border backdrop-blur-sm z-100 sticky top-0 ">
      {/* logo */}
      <div className="py-5 text-2xl font-space font-bold ml-6 text-heading">
        CricScore
      </div>
      {/* nav items */}
      <div className="hidden w-1/3 lg:flex items-center justify-between text-subheading font-semibold">
        <Link
          to={"/"}
          className="hover:text-[#cc66ff] transition-all hover:mb-1 hover:border-b-3 border-[#cc66ff]"
        >
          Home
        </Link>
        <Link
          to="/match"
          className="hover:text-[#cc66ff] transition-all hover:mb-1 hover:border-b-3 border-[#cc66ff]"
        >
          Matches
        </Link>
        <Link
          to="/tournaments"
          className="hover:text-[#cc66ff] transition-all hover:mb-1 hover:border-b-3 border-[#cc66ff]"
        >
          Tournaments
        </Link>
        <Link
          to="/about"
          className="hover:text-[#cc66ff] hover:mb-1 transition-all hover:border-b-3 border-[#cc66ff]"
        >
          About
        </Link>
        {isDark ? (
          <Sun
            className="cursor-pointer hover:animate-spin"
            onClick={toggleTheme}
          />
        ) : (
          <Moon
            className="cursor-pointer hover:animate-bounce"
            onClick={toggleTheme}
          />
        )}
      </div>

      {/* buttons */}
      <div className="flex items-center mr-20">
        <button className="p-3 text-black rounded-xl text-[14px] font-semibold bg-gradient-to-r from-[#cc66ff] to-[#00dbde] cursor-pointer hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
          Start Scoring
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
