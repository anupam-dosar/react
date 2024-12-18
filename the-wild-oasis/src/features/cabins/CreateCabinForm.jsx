import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isModeEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isModeEdit ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, updateCabin } = useUpdateCabin();

  function handleFormSubmit(data) {
    console.log(data);
    if (isModeEdit) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      updateCabin(
        { data: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onClose?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onClose?.();
          },
        }
      );
    }
  }

  function handleSubmitErrors(errors) {
    console.log(errors);
  }

  const isProcessing = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit, handleSubmitErrors)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" errors={errors}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", { required: "Required: Cabin name" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" errors={errors}>
        <Input
          type="number"
          step="1"
          disabled={isProcessing}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Required: Maximum capacity",
            min: { value: 1, message: "Minimum allowed capacity is one." },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" errors={errors}>
        <Input
          type="number"
          step="0.1"
          disabled={isProcessing}
          id="regularPrice"
          {...register("regularPrice", {
            required: "Required: Regular price",
            min: { value: 1, message: "Price can not be zero" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors}>
        <Input
          type="number"
          step="0.1"
          disabled={isProcessing}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Required: Discount, if any",
            validate: (value) =>
              value <= Number(getValues().regularPrice) * 0.2 ||
              "Discount can not be greater then 20% of regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" errors={errors}>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "Required: Description for website" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isModeEdit && editValues.image !== null ? false : "Required: Cabin Image",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isProcessing
            ? `${isModeEdit ? "Updating" : "Creating"} Cabin`
            : `${isModeEdit ? "Edit" : "Add"} cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
