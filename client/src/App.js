import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Welcome } from "./components/welcome.js";
import { Tournament } from "./components/Tournament.js";
import { Match } from "./components/CreateMatch.js";
import { Scoring } from "./components/Scoring.js";
import SetupTournament from "./components/SetupTournament.js"
import ViewMatch from "./components/ViewMatch.js";
import PreMatchSetup from "./components/PreMatchSetup.jsx";


import Players from "./pages/players.jsx";


// import LoadingBar from "react-top-loading-bar"; 

 function App (){

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/match" element={<Match />} />
        <Route path="/viewmatch" element={<ViewMatch />}/>
        <Route path="/scoring/:matchId" element={<Scoring />} />
        <Route path="/tournament/:id" element={<SetupTournament />}/>

        <Route path="/players/:tourId/:teamId" element={<Players />}/>
        {/* <Route path="/prematch" element={<PreMatchSetup />} /> */}
        <Route path="/prematch/:matchId" element={<PreMatchSetup />} />
      </Routes>
      
      
    </>
  );
}


export default App;
