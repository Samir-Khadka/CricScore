import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TournamentInfo from "./pages/TournamentInfo";
import Match from "./pages/Match";

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament/:tourname" element={<TournamentInfo />} />
        <Route path="/match/:mName" element={<Match />} />
      </Routes>
    <Footer />
    </>
  );
}

export default App;
