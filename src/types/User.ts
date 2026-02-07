export interface DeliveryDriver {
  id: number;
  uuid: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string | null;
  isAvailable: number | boolean;
  vehicleType: string;
  vehiclePlate: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  driver: DeliveryDriver;
}
