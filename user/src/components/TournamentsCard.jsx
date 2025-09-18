import { useNavigate } from "react-router-dom";

const Tournaments = (props) => {
  const navigate = useNavigate();

  //pass already fetched tournaments to tournament info page so no need to make redundant database calls

  const dataToPass = { tourInfo: props.tour };

  const handleNavigate = (to) => {
    navigate(`/tournament/${to}`, { state: dataToPass });
  };

  return (
    <div
      className="w-fit p-3 bg-[#cc66ff] rounded-2xl hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(204,102,255,0.5)] transition-all duration-300 cursor-pointer "
      onClick={() => {
        handleNavigate(props.name);
      }}
    >
      <p>{props.name}</p>
    </div>
  );
};

export default Tournaments;
