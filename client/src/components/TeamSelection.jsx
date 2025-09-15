import Select from "react-select";
import { useState } from "react";
import "../css/PreMatch.css";

export default function TeamSelection(props) {
  // const players = props.squad.split(",").map(p => ({ value: p.trim(), label: p.trim() }));

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captain, setCaptain] = useState(null);

const handlePlayerSelect = (selected) => {
  if (selected.length <= 11) {
    setSelectedPlayers(selected);

    // pass the actual "selected" players
    props.setTeam_SelectedPlayer(selected);

   // if current captain is not in selected → reset
    if (captain && !selected.some(p => p.value === captain.value)) {
      setCaptain(null);
      props.setteam_Captain(null);
    }
  }
};

const handleCaptainSelect = (captainPlayer) => {
  setCaptain(captainPlayer);

  // immediately update parent with new captain
  props.setteam_Captain(captainPlayer);
};

  //  Styles for players select (expandable multi)
  const playerSelectStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: 90,
      overflowY: "auto",
      flexWrap: "wrap",
      alignItems: "center"
    }),
    control: (provided, state) => ({
      ...provided,
       backgroundColor: "#f3f3f0",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#007bff" : "#ccc",
      boxShadow: state.isFocused ? "0 0 5px rgba(0,123,255,0.5)" : "none",
      "&:hover": { borderColor: "#007bff" },
      fontSize: "14px",
      minHeight: "42px",
      padding: "0 4px",
      zIndex: "2"
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#888",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#e6f0ff"
        : "white",
      color: state.isSelected ? "white" : "#333",
      fontSize: "14px",
    }),
  };

  // Styles for captain select (compact)
  const captainSelectStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
             backgroundColor: "#f3f3f0",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#007bff" : "#ccc",
      boxShadow: state.isFocused ? "0 0 4px rgba(0,123,255,0.4)" : "none",
      "&:hover": { borderColor: "#007bff" },
      fontSize: "14px",
      minHeight: "38px",
      padding: "0 4px"
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#888",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#e6f0ff"
        : "white",
      color: state.isSelected ? "white" : "#333",
      fontSize: "14px",
    }),
  };

  return (
    <div className="team-card">
      <div className="section">
        <label htmlFor="squad" className="section-title">
          Select Playing XI
        </label>
        <Select
          id="squad"
          isMulti
          options={props.squad}
          value={selectedPlayers}
          onChange={handlePlayerSelect}
          menuPortalTarget={document.body}
          styles={playerSelectStyles}
          placeholder="Choose up to 11 Players"
          closeMenuOnSelect={false}
          required
        />
        <p className="note">Selected: {selectedPlayers.length} / 11</p>
      </div>

      <div className="section">
        <label htmlFor="captain" className="section-title">
          Choose Captain
        </label>
        <Select
          id="captain"
          options={selectedPlayers}
          value={captain}
          onChange={handleCaptainSelect}
          menuPortalTarget={document.body}
          styles={captainSelectStyles}
          placeholder="Choose Captain"
          isClearable
          required
        />
      </div>
    </div>
  );
}
