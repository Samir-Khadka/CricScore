import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddPlayers from "../modal-forms/AddPlayers";
import EditPlayers from "../modal-forms/EditPlayers";
import '../css/player.css';

const Players = () => {
  const { tourId, teamId } = useParams();
  const [isEdit, setisEdit] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(false);
  const host = "http://localhost:5000";

   const modalref = useRef(null);

  useEffect(() => {
    fetchPlayers();
  }, [refresh]);

  const fetchPlayers = async () => {
    setLoading(true);
    const reqOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `${host}/api/cricscore/players/${tourId}/${teamId}`,
        reqOptions
      );
      const r = await response.json();

      if (response.ok) {
        setPlayers(r.players[0]);
        setLoading(false);
      } else if (response.status === 404) {
        setPlayers(null);
        //show "no players added to table row"
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      // alert("Something went wrong while fetching players");
    }
  };

  const handleDelete = async (id) => {
    var c = window.confirm("Are you sure to delete players?");
     if (!c) return;

    const reqOptions = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    try {
      if (c) {
        const response = await fetch(
          `${host}/api/cricscore/players/${id}`,
          reqOptions
        );
        if (response.ok) {
          const data= await response.json();
          alert(data.message);
          setRefresh(refresh + 1);
        }
      }
    } catch (error) {
      alert("Something went wrong while deleting");
    }
  };
 


  return (
    <>
      <div className="tournament-container">
        <button
          id="addPlayers"
          type="button"
          className="btn btn-primary m-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          ref={modalref}
          disabled={players ? true : false}
        >
          Add Players
        </button>

        <button
          id="addPlayers"
          type="button"
          className="btn btn-success m-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          ref={modalref}
          onClick={()=>{setisEdit(true)}}
          disabled={ !players ? true : false}
        >
          Edit Players
        </button>

        <button
          id="deletePlayers"
          type="button"
          className="btn btn-danger m-2"
          disabled={!players ? true : false}
          onClick={() => handleDelete(players._id)}
        >
          Delete Players
        </button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player Name</th>
              <th scope="col">Playing Role</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              players &&
              players.players.map((p, index) => {
                return (
                  <tr key={index}>
                    <td data-label="S.N">{index + 1}</td>
                    <td data-label="Player Name">
                      {p.name} {p.isCaptain ? "(C)" : ""}{" "}
                      {p.role === "wicket_keeper" || p.role === "wk_batsman" ? "(WK)" : ""}{" "}
                    </td>
                    <td data-label="Playing Role" style={{ textTransform: "capitalize" }}>{p.role}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Players
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  //   onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                {!isEdit ? (
                  <AddPlayers
                    tourId={tourId}
                    teamId={teamId}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                ) : (
                  <EditPlayers 
                  tourId={tourId}
                    players={players}                     
                    setPlayers={setPlayers}
                    teamId={teamId}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setisEdit={setisEdit}
                    />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setisEdit(false)}   // ✅ reset to AddPlayers mode
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Players;
