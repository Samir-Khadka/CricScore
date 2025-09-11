const DropdownButton = ({disabled, icon, label, options, onSelect, btnClass }) => {
  return (
    <div className="btn-group">
      
      <button type="button" className={`btn ${btnClass}`} disabled={disabled} style={{backgroundColor:'#c43138 !important'}}>
        {icon ? icon : label}
      </button>

      <button
        type="button"
        style={{backgroundColor:'#c43138 !important'}}
        className={`btn ${btnClass} dropdown-toggle dropdown-toggle-split`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={disabled}
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>

      <ul className="dropdown-menu">
        {options.map((opt, i) => (
          <li key={i}>
            <button
              className="dropdown-item"
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownButton;
