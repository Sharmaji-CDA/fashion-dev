export class UpdateOrderDto {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}
