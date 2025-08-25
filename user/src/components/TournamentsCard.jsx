import { useNavigate } from "react-router-dom";

const Tournaments = (props) => {

  const navigate = useNavigate();

  const handleNavigate = (to) => {
    navigate(`/tournament/${to}`);
  };

  return (
    <div
      className="w-fit p-3 border-2 border-gray-400 rounded-2xl hover:bg-blue-400 transition-colors hover:text-white cursor-pointer"
      onClick={() => {handleNavigate(props.name)}}
    >
      <p>{props.name}</p>
    </div>
  );
};

export default Tournaments;
