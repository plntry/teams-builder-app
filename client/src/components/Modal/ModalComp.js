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
      // ? "Please fill the data and save the changes"
      ? "Будь ласка, заповніть дані та збережіть зміни"
      // : "Do you want to remove this row from the database?"
      : "Ви хочете видалити цей рядок?"
  );

  const modalTitle =
    modalState.action === "edit"
      ? "Редагування запису"
      : modalState.action === "add"
      ? "Створення нового запису"
      : "Видалення запису";

  const handleOk = () => {
    setModalText("Success!");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setModalState(false);
    //   setConfirmLoading(false);
    // }, 2000);
    setModalState(false);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
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
