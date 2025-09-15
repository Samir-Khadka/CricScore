import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#121317] mt-10 p-6 flex flex-row gap-20 pl-10">
      <div>
        <header className="text-xl text-slate-100 font-space">CricScore</header>
        <p className="text-sm text-slate-200 font-inter mt-2">
          A real-time cricket scoring platform with real-time score updates.
        </p>
        <div className="text-slate-300 pt-10 text-sm">&copy; CricScore</div>
      </div>
      <div className="flex flex-col text-slate-300 text-xm space-y-3">
        <Link>Home</Link>
        <Link>Matches</Link>
        <Link>Tournaments</Link>
        <Link>About</Link>
        <Link>Scorer Dashboard</Link>
      </div>
    </footer>
  );
};

export default Footer;
