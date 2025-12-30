import { Car } from "../entities/Car";

export interface ICarRepository {
  create(car: Car): Promise<void>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  findById(id: string): Promise<Car | null>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}
