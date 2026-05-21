import PaymentButton from "./PaymentCheckout";
import { useParams } from "react-router-dom";


const PaymentPage = () => {
  const { foodId } = useParams();
// console.log(foodId);

  return (
    <PaymentButton
      foodId={foodId}
      // mealName="Deluxe Meal"
    />
  );
};

export default PaymentPage;
