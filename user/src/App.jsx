import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TournamentInfo from "./pages/TournamentInfo";

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament/:tourname" element={<TournamentInfo />} />
      </Routes>
    <Footer />
    </>
  );
}

export default App;
