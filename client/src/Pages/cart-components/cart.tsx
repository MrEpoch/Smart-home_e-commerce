import "./cart.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Cart(): React.ReactNode {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handle_close = () => {
    setShow(false);
    setLoading(false);
  };

  const handle_payment = () => {
    setLoading(true);
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        type="button"
        className="btn button_box bg-black text-white"
      >
        <ShoppingCartIcon />
      </button>
      {loading && <div>loading...</div>}
      <Modal
        className="cart_modal"
        show={show}
        onHide={handle_close}
        role="dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here will be cart items</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handle_payment} className="btn btn-primary">
            Proceed to pay
          </button>
          <button onClick={handle_close} className="btn btn-secondary">
            Continue shopping
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
