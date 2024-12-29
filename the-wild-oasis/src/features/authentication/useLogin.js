import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { isLoading: isLogin, mutate: userLogin } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      console.log("user", user);
      // Do something
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Invalid email or password");
    },
  });

  return { isLogin, userLogin };
}
