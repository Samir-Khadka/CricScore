const ScoringButtons = (props) => {
  return (
    <div className={`${props.data.type}`}>
      {props.data.buttons.map((btns, i) => {
        return (
          <button
            key={i}
            type="button"
            className="scoring-button"
            style={{ background: `${props.data.background}` }}
            onClick={() => props.onButtonClick(btns.update)}
          >
            {btns.label}
          </button>
        );
      })}
    </div>
  );
};

export default ScoringButtons;
