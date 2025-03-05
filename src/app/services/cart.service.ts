import { Injectable } from '@angular/core';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
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

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cart;
  }

  setCartItems(items: CartItem[]): void {
    this.cart = items;
  }

  calculateTotal(): number {
    let total = 0;
    // 1 default calculation
    for (const item of this.cart) {
      total += item.price * item.quantity;
    }

    // 2 10% discount for price over 3000
    if (total > 3000) {
      total *= 0.9;
    }

    // 3 20% discount for 5 apples
    const almaItem = this.cart.find(i => i.name === 'alma');
    if (almaItem && almaItem.quantity > 5) {
      const almaDiscount = almaItem.price * almaItem.quantity * 0.2;
      total -= almaDiscount;
    }

    return total;
  }
}
