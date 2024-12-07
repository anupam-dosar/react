import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

function Username() {
  const username = useSelector(getUsername);

  return username ? (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  ) : null;
}

export default Username;
