import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";

const prisma = new PrismaClient();

@injectable()
export class PrismaCarRepository implements ICarRepository {
  async create(car: Car): Promise<void> {
    await prisma.car.create({
      data: {
        id: car.id,
        licensePlate: car.licensePlate,
        model: car.model,
        dailyRate: car.dailyRate,
        available: car.available,
      },
    });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: { licensePlate },
    });
    if (!car) return null;
    return new Car(car.id, car.licensePlate, car.model, car.dailyRate, car.available);
  }

  async findById(id: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: { id },
    });
    if (!car) return null;
    return new Car(car.id, car.licensePlate, car.model, car.dailyRate, car.available);
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await prisma.car.update({
      where: { id },
      data: { available },
    });
  }
}
