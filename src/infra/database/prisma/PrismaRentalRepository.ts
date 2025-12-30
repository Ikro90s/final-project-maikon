import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

const prisma = new PrismaClient();

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  async create(rental: Rental): Promise<void> {
    await prisma.rental.create({
      data: {
        id: rental.id,
        carId: rental.carId,
        userId: rental.userId,
        startDate: rental.startDate,
        expectedReturnDate: rental.expectedReturnDate,
        returnDate: rental.returnDate,
        total: rental.total,
      },
    });
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = await prisma.rental.findFirst({
      where: {
        carId,
        returnDate: null,
      },
    });
    if (!rental) return null;
    return new Rental(
      rental.id,
      rental.carId,
      rental.userId,
      rental.startDate,
      rental.expectedReturnDate,
      rental.returnDate ?? undefined,
      rental.total ?? undefined
    );
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = await prisma.rental.findFirst({
      where: {
        userId,
        returnDate: null,
      },
    });
    if (!rental) return null;
    return new Rental(
      rental.id,
      rental.carId,
      rental.userId,
      rental.startDate,
      rental.expectedReturnDate,
      rental.returnDate ?? undefined,
      rental.total ?? undefined
    );
  }
}
