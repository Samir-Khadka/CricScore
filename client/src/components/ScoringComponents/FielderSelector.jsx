import { useState } from "react";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";

const FielderSelector = ({ show, onClose, options, onConfirm }) => {
  const [selected, setSelected] = useState([]);

  const handleConfirm = () => {
    if (selected.length === 0) {
      alert("Please select fielders");
    } else {
      onConfirm(selected.map((s) => s.value));
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select 2 Fielders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          isMulti
          options={options}
          value={selected}
          onChange={setSelected}
          closeMenuOnSelect={false}
          placeholder="Choose fielders..."
        />

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FielderSelector;
