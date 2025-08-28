import React, { useState,useEffect} from "react";
import Players from "../pages/players";


const EditPlayers = ({ players, setPlayers, tourId, teamId, refresh, setRefresh, setisEdit }) => {


  // local state initialized from props
  const [formData, setFormData] = useState({
    players: players?.players || []
  });

  // when props.players change, update local state
  useEffect(() => {
    if (players) {
      setFormData({
        players: players.players
      });
    }
  }, [players]);

  const handleChange = (index, field, value) => {
    const updatedPlayers = [...formData.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setFormData({ ...formData, players: updatedPlayers });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  let nameEmptyCount = 0;
  let roleEmptyCount = 0;

  // validate
  formData.players.map((player) => {
    if (!player.name.trim()) {
      nameEmptyCount++;
    }

    if (!player.role.trim()) {
      roleEmptyCount++;
    }
  });

  // validation
  let captainCount = formData.players.filter((p) => p.isCaptain).length;
  if (captainCount !== 1) {
    alert("Exactly 1 player must be selected as Captain");
    return;
  }

  if (formData.players.some((p) => !p.name.trim())) {
    alert("All players must have a name");
    return;
  }
  if (formData.players.some((p) => !p.role.trim())) {
    alert("All players must have a role");
    return;
  }

  if (nameEmptyCount > 0) {
    alert(`${nameEmptyCount} players name is empty. Please fill all of them`);
    return false;
  }
  if (roleEmptyCount > 0) {
    alert(
      `${roleEmptyCount} players role is not selected. Please select role for all of them`
    );
    return false;
  }

    const reqOptions = {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        players: formData.players,
        tourId: tourId,
        teamId: teamId,
      }),
    };

    const host = "http://localhost:5000";

    try {
      const response = await fetch(
        `${host}/api/cricscore/players/update`,
        reqOptions
      );
      const r = await response.json();
      alert(r.message);
    //   setPlayers(
    //     Array.from({ length: 15 }, () => ({
    //       name: "",
    //       role: "",
    //       isCaptain: false,
    //     }))
    //   );
      setRefresh(refresh+1);
    } catch (error) {
      alert(error);
    }
  };
//   console.log("Name:"+players.player[0].name);
//   console.log("Role"+players.players[0].role);
//   console.log("IsCaptain"+players.players[0].isCaptain);

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h2 style={{ textAlign: "center" }}>Add Players</h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {formData.players.map((player, index) => (
                <React.Fragment key={index}>
                  <div className="form-group">
                    <input
                      type="text"
                      id={`player${index}`}
                      placeholder={`Player ${index + 1}`}
                      value={player.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={player.role}
                      id={`role${index}`}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                    >
                      <option value="">-- Select a role --</option>
                      <option value="batsman">Batsman</option>
                      <option value="bowler">Bowler</option>
                      <option value="wicket_keeper">Wicket-Keeper</option>
                      <option value="wk_batsman">Wicket-Keeper Batsman</option>
                      <option value="all_rounder_batting">
                        All-Rounder (Batting)
                      </option>
                      <option value="all_rounder_bowling">
                        All-Rounder (Bowling)
                      </option>
                    </select>
                  </div>

                  <div className="form-group d-flex gap-2">
                    <input
                      type="radio"
                      name="captain"
                      id={`isCaptain${index}`}
                      checked={player.isCaptain}
                       onChange={() => {
                          // Reset all players to false
                          const updatedPlayers = formData.players.map((p, i) => ({
                             ...p,
                             isCaptain: i === index, // only the clicked one is true
                           }));
                           setFormData({ ...formData, players: updatedPlayers });
                         }}
                    />
                    <label htmlFor={`isCaptain${index}`}>Is Captain?</label>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <input
              id="update_submit_btn"
                type="submit"
                name="submit"
                value="Update Players"
                style={{ backgroundColor:"#0d6efd !important" }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPlayers;