import { Injectable } from '@angular/core';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  discount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [
    {
      name: 'alma',
      price: 150,
      quantity: 4,
      image: "https://firebasestorage.googleapis.com/v0/b/cart-frederik.firebasestorage.app/o/apple.png?alt=media&token=bd08516a-2a45-408b-9505-8bf85ccee9ee"
    },
    {
      name: 'tej',
      price: 300,
      quantity: 2,
      image: 'https://firebasestorage.googleapis.com/v0/b/cart-frederik.firebasestorage.app/o/milk.png?alt=media&token=d7c815ee-d607-415b-9268-799d02c3d06e'
    },
    {
      name: 'kenyér',
      price: 200,
      quantity: 1,
      image: 'https://firebasestorage.googleapis.com/v0/b/cart-frederik.firebasestorage.app/o/bread.png?alt=media&token=26055259-5caa-4e4a-b685-e6bab4b7ea8d'
    }
  ];
  totalDiscount: number = 0;

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cart;
  }

  setCartItems(items: CartItem[]): void {
    this.cart = items;
  }

  calculateTotal(): number {
    this.totalDiscount = 0;
    let total = 0;
    this.cart.forEach(item => {
        // Prevent negative values
        if (item.quantity < 0) {
            item.quantity = 0;
        }
        item.discount = 0;
    });
    // Default calculation (Sum up price * quantity)
    for (const item of this.cart) {
        total += item.price * item.quantity;
    }
    // 10% discount if total is over 3000 Ft
    if (total > 3000) {
        let discountAmount = total * 0.1;
        this.totalDiscount += discountAmount;
        total -= discountAmount;
    }
    // 20% discount if more than 5 apples
    const appleItem = this.cart.find(i => i.name === 'alma');
    if (appleItem && appleItem.quantity > 5) {
        let appleDiscount = appleItem.price * appleItem.quantity * 0.2;
        appleItem.discount = appleDiscount;
        this.totalDiscount += appleDiscount;
        total -= appleDiscount;
    }

    return total;
}

}
