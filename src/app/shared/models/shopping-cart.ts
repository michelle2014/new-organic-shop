
import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: {[ productId: string]: ShoppingCartItem }) {
        // this.itemsMap = itemsMap || {}; 

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            // with the flattening shopping cart items method, need to delete all items and add new again
            // let x = new ShoppingCartItem({
                // better initialization of object as below
                // title: item.title,
                // imageUrl: item.imageUrl,
                // price: item.price, 
                // ...item, 
                // $key: productId
            // });
            // no need of the the two lines below with the better object initialization above
            // Object.assign(x, item);
            // x.$key = productId;
            // this.items.push(x);
            // Or something like this:
            // this.items.push(new ShoppingCartItem({ ...item, $key: productId }););
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) 
            count += this.items[productId].quantity;
        return count;
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.id];
        return item ? item.quantity: 0; 
      }
}