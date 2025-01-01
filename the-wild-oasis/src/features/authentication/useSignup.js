import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLocding: isSignup, mutate: userSignup } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Signup successful");
    },
  });
  return { isSignup, userSignup };
}
