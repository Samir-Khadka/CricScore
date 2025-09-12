const ScoringButtons = (props) => {
  return (
    <div className={`${props.data.type}`}>
                    <div className="header-cell" colSpan="2" style={{ background: `${props.data.background}`}}>
                {props.data.type}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
      {props.data.buttons.map((btns, i) => {
        return (
          <button
            key={i}
            disabled={props.disabled}
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
    </div>
  );
};

export default ScoringButtons;
