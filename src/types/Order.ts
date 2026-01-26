export type OrderStatus = 
  | 'draft' 
  | 'pending_payment' 
  | 'confirmed' 
  | 'prepared' 
  | 'delivered' 
  | 'cancelled' 
  | 'completed';

export interface OrderItem {
  id: number;
  itemType: 'product' | 'rescue_menu';
  productId: number | null;
  rescueMenuId: number | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  itemName: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDelivery {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postalCode: string;
  phone: string | null;
}

export interface Order {
  id: number;
  uuid: string | null;
  userId: number;
  status: OrderStatus;
  deliveryType: 'pickup' | 'delivery';
  pickupSlotId: number | null;
  paymentIntentId: string | null;
  subtotal: number;
  total: number;
  currency: string;
  notes: string | null;
  items: OrderItem[];
  delivery?: OrderDelivery | null;
  createdAt: string;
  updatedAt: string;
}
