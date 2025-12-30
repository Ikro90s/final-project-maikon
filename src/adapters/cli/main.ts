import "reflect-metadata";
import { container } from "../../infra/container";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { Car } from "../../domain/entities/Car";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { TYPES } from "../../infra/container/types";
import dayjs from "dayjs";

async function main() {
  const createRentalUseCase = container.resolve(CreateRentalUseCase);
  const carRepository = container.get<ICarRepository>(TYPES.ICarRepository);

  // Seed a car
  const car = new Car("car-01", "ABC-1234", "Toyota Corolla", 100);
  await carRepository.create(car);

  console.log("Car created:", car);

  // Try to create a rental with invalid duration (bug)
  try {
    const rental = await createRentalUseCase.execute({
      userId: "user-01",
      carId: "car-01",
      expectedReturnDate: dayjs().add(5, "hours").toDate(), // Invalid: < 24h
    });
    console.log("Rental created:", rental);
  } catch (err) {
    console.error("Error creating rental:", err);
  }
}

main();
