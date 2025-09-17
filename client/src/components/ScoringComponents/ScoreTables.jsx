
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/ScoreTables.css"; // custom css

function ScoreTables({ updatedInning }) {
  if (!updatedInning) return null;

  const batsmen = updatedInning.batsmen || [];
  const bowlers = updatedInning.bowlers || [];

  const formatOvers = (balls) => {
    if (!balls || balls === 0) return "0.0";
    return `${Math.floor(balls / 6)}.${balls % 6}`;
  };

  return (
    <div className="row g-4" style={{marginBottom:"3rem"}}>
      {/* 🏏 Batsmen Table */}
      <div className="col-12 col-md-6">
        <div className="card shadow-sm premium-card h-100">
          <div className="card-header premium-header">
            <h5 className="mb-0">Batsmen</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 align-middle">
                <thead className="table-head-green" style={{ backgroundColor: "#198754" }}>
                  <tr>
                    <th>Name</th>
                    <th className="text-center">R</th>
                    <th className="text-center">B</th>
                    <th className="text-center">4s</th>
                    <th className="text-center">6s</th>
                    <th className="text-center">SR</th>
                  </tr>
                </thead>
<tbody id="Batman_tbody">
  {batsmen.map((b) => (
    b.status !== "Out" && (
      <tr key={b._id}>
        <td data-label="Name">{b.name || "Unknown"}</td>
        <td data-label="R" className="text-center fw-bold">{b.runs}</td>
        <td data-label="B" className="text-center">{b.balls}</td>
        <td data-label="4s" className="text-center">{b.fours}</td>
        <td data-label="6s" className="text-center">{b.sixes}</td>
        <td data-label="SR" className="text-center">
          {b.strike_rate ? b.strike_rate.toFixed(2) : "0.00"}
        </td>
      </tr>
    )
  ))}
</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 Bowlers Table */}
      <div className="col-12 col-md-6">
        <div className="card shadow-sm premium-card h-100" style={{marginRight:'1rem !important'}}>
          <div className="card-header premium-header" style={{marginRight:'1rem !important'}}>
            <h5 className="mb-0">Bowlers</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0 align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th className="text-center">O</th>
                    <th className="text-center">M</th>
                    <th className="text-center">R</th>
                    <th className="text-center">W</th>
                    <th className="text-center">Econ</th>
                    <th className="text-center">NB</th>
                    <th className="text-center">WD</th>
                  </tr>
                </thead>
                <tbody id="Bowler_tbody">
                  {bowlers.map((bw) => (
                    <tr key={bw._id}>
                      <td data-label="Name" >{bw.name || "Unknown"}</td>
                      <td data-label="O" className="text-center">{formatOvers(bw.balls)}</td>
                      <td data-label="M" className="text-center">{bw.maidens}</td>
                      <td data-label="R" className="text-center">{bw.runs_conceded}</td>
                      <td data-label="W" className="text-center fw-bold">{bw.wickets}</td>
                      <td data-label="Econ" className="text-center">
                        {bw.economy ? bw.economy.toFixed(2) : "0.00"}
                      </td>
                      <td data-label="NB" className="text-center">{bw.extras?.no_ball || 0}</td>
                      <td data-label="WD" className="text-center">{bw.extras?.wide || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreTables;
