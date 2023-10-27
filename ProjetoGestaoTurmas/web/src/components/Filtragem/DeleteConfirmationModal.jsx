import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// O componente recebe três propriedades: 'show', 'onHide' e 'onConfirm'
export function DeleteConfirmationModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide} centered={true} className="centered-modal">
      <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza de que deseja apagar?
      </Modal.Body>
      <Modal.Footer>
        {/* Botão para cancelar a ação */}
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        {/* Botão para confirmar a ação de exclusão */}
        <Button variant="danger" onClick={onConfirm}>
          Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
