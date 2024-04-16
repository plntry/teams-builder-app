import React, { useState } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";
import AddEditForm from "./AddEditForm";

const ModalComp = ({
  specializations,
  modalState,
  setModalState,
  currentElement,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    modalState.action === "edit" || modalState.action === "add"
      ? "Please fill the data and save the changes"
      : "Do you want to remove this row from the database?"
  );

  const modalTitle =
    modalState.action === "edit"
      ? "Edit Row"
      : modalState.action === "add"
      ? "Add New Row"
      : "Delete Row";

  const handleOk = () => {
    setModalText("The window will be closed after two seconds...");
    setConfirmLoading(true);
    setTimeout(() => {
      setModalState(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setModalState(false);
  };

  return (
    <>
      <Modal
        title={modalTitle}
        open={modalState}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
        {(modalState.action === "add" || modalState.action === "edit") && (
          <AddEditForm
            specializations={specializations}
            formState={modalState.action}
            formMode="candidate"
            currentElement={currentElement}
            handleOk={handleOk}
          />
        )}
      </Modal>
    </>
  );
};
export default ModalComp;
