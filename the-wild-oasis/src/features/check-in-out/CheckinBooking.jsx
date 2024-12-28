import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const { settings, isLoading: isFetchingSettings } = useSettings();

  const moveBack = useMoveBack();

  const { isLoading, booking } = useBooking();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking || {};

  const optionalBreakfastPrice = (settings?.breakfastPrice || 0) * (numGuests || 0) * numNights;

  useEffect(() => setConfirmPaid(isPaid || false), [isPaid]);
  useEffect(() => setIncludeBreakfast(hasBreakfast || false), [hasBreakfast]);

  const { isCheckingIn, updateCheckin } = useCheckin();

  function handleCheckin() {
    if (confirmPaid) {
      if (includeBreakfast) {
        updateCheckin({
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        });
      } else {
        updateCheckin({ bookingId, breakfast: {} });
      }
    }
  }

  return isLoading || isFetchingSettings || !booking ? (
    <Spinner />
  ) : (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={includeBreakfast}
            onChange={() => {
              setIncludeBreakfast((b) => !b);
              setConfirmPaid(false);
            }}
            id="has-breakfast"
          >
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          id="confirm-paid"
          disabled={confirmPaid || isCheckingIn}
        >
          Check to confirm {guests.fullName} has made the payment of{" "}
          {formatCurrency(totalPrice + (includeBreakfast ? optionalBreakfastPrice : 0))} in full.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
