import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./Components/CartContainer";
import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import { calculateTotals, getCartItems } from "./Features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();

  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading">Loading....</div>
      ) : (
        <main>
          {isOpen && <Modal></Modal>}
          <Navbar></Navbar>
          <CartContainer></CartContainer>
        </main>
      )}
    </>
  );
}
export default App;
