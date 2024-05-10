import React, { useState } from "react";
import { Modal } from "antd";
import AddEditForm from "./AddEditForm";

const ModalComp = ({
  setDataElements,
  additionalData,
  formMode,
  modalState,
  setModalState,
  currentElement,
}) => {
  // setDataElements = useStore.use.;

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
    setModalText("Success! The window will be closed after two seconds...");
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
      {(modalState.action === "add" || modalState.action === "edit") && (
        <Modal
          title={modalTitle}
          open={modalState}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <p>{modalText}</p>
          <AddEditForm
            additionalData={additionalData}
            formState={modalState.action}
            formMode={formMode}
            currentElement={currentElement}
            handleOk={handleOk}
          />
        </Modal>
      )}
      {(modalState.action === "delete") && (
        <Modal
          title={modalTitle}
          open={modalState}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <p>{modalText}</p>
          <AddEditForm
            setDataElements={setDataElements}
            additionalData={additionalData}
            formState={modalState.action}
            formMode={formMode}
            currentElement={currentElement}
            handleOk={handleOk}
          />
        </Modal>
      )}
    </>
  );
};
export default ModalComp;
