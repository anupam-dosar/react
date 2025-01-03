import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("anupam@esg-ind.in");
  const [password, setPassword] = useState("Azakaban1#");

  const { isLogin, userLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    userLogin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogin}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogin}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogin}>
          {isLogin ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
