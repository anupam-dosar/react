import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQty from "./UpdateItemQty";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="fonr-bo text-sm">{formatCurrency(totalPrice)}</p>

        <UpdateItemQty pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
