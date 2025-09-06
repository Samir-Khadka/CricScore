const DropdownButton = ({ icon, label, options, onSelect, btnClass }) => {
  return (
    <div className="btn-group">
      <button type="button" className={`btn ${btnClass}`}>
        {icon ? icon : label}
      </button>

      <button
        type="button"
        className={`btn ${btnClass} dropdown-toggle dropdown-toggle-split`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
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
