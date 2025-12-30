import "reflect-metadata";
import "dotenv/config";
import { container } from "../../infra/container";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { Car } from "../../domain/entities/Car";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { TYPES } from "../../infra/container/types";
import dayjs from "dayjs";

async function main() {
  const createRentalUseCase = container.get(CreateRentalUseCase);
  const carRepository = container.get<ICarRepository>(TYPES.ICarRepository);

  // Seed a car
  const car = new Car("car-01", "ABC-1234", "Toyota Corolla", 100);
  try {
    await carRepository.create(car);
    console.log("Car created:", car);
  } catch (error) {
    console.log("Car already exists (skipping creation)");
  }

  // Try to create a rental with invalid duration (bug)
  try {
    const rental = await createRentalUseCase.execute({
      userId: "user-01",
      carId: "car-01",
      expectedReturnDate: dayjs().add(2, "days").toDate(), // Valid: > 24h
    });
    console.log("Rental created:", rental);
  } catch (err) {
    console.error("Error creating rental:", err);
  }
}

main();
