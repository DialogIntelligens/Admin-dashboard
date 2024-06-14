import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { ImSpinner8 } from 'react-icons/im'
const UpdateStatus = ({ handler, open, onClose, loader,text }) => {
  return (
    <>
      <Modal isOpen={open} toggle={onClose}>
        <ModalHeader className='text-capitalize' toggle={onClose}>{text}</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to  {text}?</p>
        </ModalBody>
        <ModalFooter>
          <Button className='bg_gradient text-capitalize' disabled={loader} onClick={handler}>
            {text}
            {loader && <ImSpinner8 className="spinning-icon" />}
          </Button>{' '}
          <Button color="danger" disabled={loader} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UpdateStatus
