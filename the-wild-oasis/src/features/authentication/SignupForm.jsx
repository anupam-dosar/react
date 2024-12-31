import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  function handleFormSubmit(data) {
    console.log(data);
  }

  function handleSubmitErrors(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit, handleSubmitErrors)}>
      <FormRow label="Full name" errors={errors}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Required: Full name" })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Required: Email address",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Required: Password",
            minLength: { value: 8, message: "Password must be at least of 8 characters" },
            pattern: {
              value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Required: Confirm password",
            validate: (value) => value === getValues().password || "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
