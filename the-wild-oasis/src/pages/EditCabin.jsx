import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Modal from "../ui/Modal";

function EditCabin({ cabin, children }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-edit-form">{children}</Modal.Open>
      <Modal.Window name="cabin-edit-form">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;
