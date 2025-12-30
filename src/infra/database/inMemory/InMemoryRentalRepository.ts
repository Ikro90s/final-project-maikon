import { Rental } from "../../../../domain/entities/Rental";
import { IRentalRepository } from "../../../../domain/repositories/IRentalRepository";

export class InMemoryRentalRepository implements IRentalRepository {
  rentals: Rental[] = [];

  async create(rental: Rental): Promise<void> {
    this.rentals.push(rental);
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.carId === carId && !rental.returnDate
    );
    return rental || null;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.userId === userId && !rental.returnDate
    );
    return rental || null;
  }
}
