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
      className="w-fit p-3 border-2 border-gray-400 rounded-2xl hover:bg-blue-400 transition-colors hover:text-white cursor-pointer"
      onClick={() => {
        handleNavigate(props.name);
      }}
    >
      <p>{props.name}</p>
    </div>
  );
};

export default Tournaments;
