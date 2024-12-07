import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQty, getInCartQuantity, increaseQty } from "./cartSlice";

function UpdateItemQty({ pizzaId }) {
  const itemQuantity = useSelector(getInCartQuantity(pizzaId));
  const dispatch = useDispatch();

  return (
    <div className="md-gap-3 flex items-center gap-2">
      <Button type="round" onClick={() => dispatch(decreaseQty(pizzaId))}>
        {itemQuantity > 1 ? "-" : "🗑️"}
      </Button>
      <span>{itemQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseQty(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQty;
