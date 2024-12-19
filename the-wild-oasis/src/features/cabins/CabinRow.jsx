import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import { HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash } from "react-icons/hi2";
import { useCabinDelete } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import EditCabin from "../../pages/EditCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

const StyledIcon = styled.span`
  cursor: pointer;
  font-size: 1.25em;
`;

function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  const { isDeleting, deleteCabin } = useCabinDelete();

  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <ActionWrapper>
        <StyledIcon onClick={() => handleDuplicate()} disabled={isCreating}>
          <HiOutlineSquare2Stack />
        </StyledIcon>
        <EditCabin cabin={cabin}>
          <StyledIcon>
            <HiOutlinePencilSquare />
          </StyledIcon>
        </EditCabin>

        <Modal>
          <Modal.Open opens={`delete-cabin-${cabinId}`}>
            <StyledIcon>
              <HiOutlineTrash />
            </StyledIcon>
          </Modal.Open>
          <Modal.Window name={`delete-cabin-${cabinId}`}>
            <ConfirmDelete
              resourceName={`Cabin ${name}`}
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </ActionWrapper>
    </TableRow>
  );
}

export default CabinRow;
