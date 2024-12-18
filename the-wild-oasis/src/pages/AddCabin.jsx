import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Modal from "../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
        {isOpenModal ? "Hide form" : "Add new cabin"}
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
