import { Link } from "wouter";
import CartItem from "../components/CartItem";
import type { CartItem as CartItemType } from "../types";

interface Totals {
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
}

interface CartProps {
  cart: CartItemType[];
  totals: Totals;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}

export default function Cart({ cart, totals, onUpdateQty, onRemove }: CartProps) {
  if (cart.length === 0) {
    return (
      <div className="alert alert-info">
        Your cart is empty. <Link href="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="col-12 col-lg-8">
        <h2 className="mb-3">Your Cart</h2>
        {cart.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onUpdateQty={onUpdateQty}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="col-12 col-lg-4">
        <div className="border rounded p-3">
          <h4>Summary</h4>
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>${totals.shippingFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${totals.grandTotal.toFixed(2)}</span>
          </div>

          <Link className="btn btn-primary w-100 mt-3" href="/checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}