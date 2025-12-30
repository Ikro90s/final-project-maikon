import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  create(rental: Rental): Promise<void>;
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
}
