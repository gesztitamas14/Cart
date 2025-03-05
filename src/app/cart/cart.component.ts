import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  finalTotal: number = 0;
  totalDiscount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  onQuantityChange(item: CartItem) {
    if (item.quantity < 0) {
        item.quantity = 0;
    }
    this.calculateTotal();
}

  calculateTotal(): void {
    this.finalTotal = this.cartService.calculateTotal();
    this.totalDiscount = this.cartService.totalDiscount;
  }
}
