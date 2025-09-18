import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TournamentInfo from "./pages/TournamentInfo";
import Match from "./pages/Match";
import MatchPanels from "./components/Match";
import Matches from "./pages/Matches";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament/:tourname" element={<TournamentInfo />} />
        <Route
          path="/match/:tourName/:matchName/:matchId"
          element={<Match />}
        />
        <Route path="/match" element={<MatchPanels />} />
        <Route path="/matches/:type" element={<Matches />} />
        <Route path="/matches/" element={<Matches />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
