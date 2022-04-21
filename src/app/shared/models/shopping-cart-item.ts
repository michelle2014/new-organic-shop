import { Product } from "./product";

export class ShoppingCartItem {
    // $key: string;
    // title: string;
    // imageUrl: string;
    // price: number;
    // quantity: number;

    constructor(public product: Product, public quantity: number) {}
    // constructor(init?: Partial<ShoppingCartItem>) {Object.assign(this, init)}

    get totalPrice() {
        console.log(this.product);
        return this.product.price * this.quantity;
    }
}