import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSettings();

  const handleUpdate = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    if (!value) return;
    updateSetting({ [id]: value });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          id="minBookingLength"
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          id="maxBookingLength"
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          id="maxGuestsPerBooking"
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          id="breakfastPrice"
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
