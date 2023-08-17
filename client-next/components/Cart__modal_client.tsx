'use client';
import { useState } from "react";
import { Modal } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getCart, removeFromCart } from "@/lib/api";
import css from "@/styles/Home.module.css";
import { CartItem } from "@/types/Type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart({ cart_items }: { cart_items: CartItem[] }): React.ReactNode {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCarts] = useState(cart_items);
  const router = useRouter();

  async function getCart__data() {
      const cart_data = await getCart();
      setCarts(cart_data);
  }

  const handle_close = () => {
    setShow(false);
    setLoading(false);
  };

  const handle_payment = () => {
      setShow(false);
      router.push('/payment');
  };
  
  async function handle_remove(item: CartItem) {
      try {
          await removeFromCart(item);
          setCarts(cart.filter((cart_item: CartItem) => cart_item.id !== item.id));
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
     <div className={css.badge__container}>
        
        {cart.length > 0 && <code className={css.badge__item}>{cart.length}</code>}
        <button
      onClick={async() => {await getCart__data(); setShow(true)}}
        type="button"
        className="btn button_box bg-black text-white"
      >
        <ShoppingCartIcon />
      </button>
      </div>
      {loading && <div>loading...</div>}
      <Modal
        size="lg"
        className={css.modal__container}
        show={show}
        onHide={handle_close}
        role="dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {cart.map((item: CartItem, index: number) => (
          <div className={css.cart__item} key={index}>
                <div className={css.cart__item_info}>            
                    <Image src={item.image} alt={item.name} width={100} height={100} className={css.cart__image} />
                    <p>{item.name}</p>
                </div>
                <div className={css.cart__item_control}>
                    <p className={css.cart__para}>{item.quantity}x</p>
                    <p className={css.cart__para}>${item.price}</p>
                    <button onClick={async () => { await handle_remove(item)}} className="btn btn-danger">Remove</button>
                </div>
          </div>
            ))
        }
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
