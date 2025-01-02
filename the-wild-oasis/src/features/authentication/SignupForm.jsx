import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    reset,
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const { isSignup, userSignup } = useSignup();

  function handleFormSubmit({ fullName, email, password }) {
    userSignup({ fullName, email, password }, { onSettled: reset });
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
          disabled={isSignup}
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
          disabled={isSignup}
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
          disabled={isSignup}
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
          disabled={isSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSignup} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
