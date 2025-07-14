export class CreateOrderDto {
  userId: number;
  totalAmount: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
