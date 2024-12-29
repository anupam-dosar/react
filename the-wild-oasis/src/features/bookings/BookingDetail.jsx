import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";

import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const status = booking?.status || "unconfirmed";

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { isCheckingout, updateCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return isLoading || !booking ? (
    <Spinner />
  ) : (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button variation="primary" onClick={() => navigate(`/bookings/${booking.id}/check-in`)}>
            <HiArrowDownOnSquare />
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => updateCheckout(booking.id)} disabled={isCheckingout}>
            <HiArrowUpOnSquare />
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens={`delete-booking-${booking.id}`}>
            <Button variation="danger">
              <HiTrash />
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name={`delete-booking-${booking.id}`}>
            <ConfirmDelete
              resourceName={`Booking ${booking.id}`}
              onConfirm={() => {
                deleteBooking(booking.id, { onSettled: moveBack });
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
