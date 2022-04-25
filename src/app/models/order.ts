export class Order {
  orderId: number = -1;
  entry: string = "";
  qty: number = 0;
  price: number =0.0;
  userId: number = -1;

  constructor(entry?: string, qty?: number, price?: number, userId?: number)
  {
    this.entry = entry;
    this.qty = qty;
    this.price = price;
    this.userId = userId;
  }
}
