import { Button, Modal } from 'react-bootstrap';

const Confirmacion = ({
  title,
  mensaje,
  handleClose,
  showConfirm,
  handleConfirm,
}) => {
  return (
    <Modal show={showConfirm} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmacion;
