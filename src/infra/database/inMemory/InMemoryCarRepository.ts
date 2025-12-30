import { Car } from "../../../../domain/entities/Car";
import { ICarRepository } from "../../../../domain/repositories/ICarRepository";

export class InMemoryCarRepository implements ICarRepository {
  cars: Car[] = [];

  async create(car: Car): Promise<void> {
    this.cars.push(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.licensePlate === licensePlate);
    return car || null;
  }

  async findById(id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === id);
    return car || null;
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}
