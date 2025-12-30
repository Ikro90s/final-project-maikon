import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";
import { Car } from "../../../domain/entities/Car";
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryCarRepository: InMemoryCarRepository;
let inMemoryRentalRepository: InMemoryRentalRepository;

describe("Create Rental", () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    inMemoryRentalRepository = new InMemoryRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryCarRepository,
      inMemoryRentalRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = new Car("123", "ABC-1234", "Brand", 100);
    await inMemoryCarRepository.create(car);

    const rental = await createRentalUseCase.execute({
      userId: "123456",
      carId: "123",
      expectedReturnDate: dayjs().add(1, "day").toDate(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = new Car("123", "ABC-1234", "Brand", 100);
    await inMemoryCarRepository.create(car);

    await createRentalUseCase.execute({
      userId: "123456",
      carId: "123",
      expectedReturnDate: dayjs().add(1, "day").toDate(),
    });

     const car2 = new Car("1234", "ABC-1235", "Brand", 100);
    await inMemoryCarRepository.create(car2);

    await expect(
      createRentalUseCase.execute({
        userId: "123456",
        carId: "1234",
        expectedReturnDate: dayjs().add(1, "day").toDate(),
      })
    ).rejects.toEqual(new Error("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = new Car("123", "ABC-1234", "Brand", 100);
    await inMemoryCarRepository.create(car);

    await createRentalUseCase.execute({
      userId: "123456",
      carId: "123",
      expectedReturnDate: dayjs().add(1, "day").toDate(),
    });

    await expect(
      createRentalUseCase.execute({
        userId: "321",
        carId: "123",
        expectedReturnDate: dayjs().add(1, "day").toDate(),
      })
    ).rejects.toEqual(new Error("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    const car = new Car("123", "ABC-1234", "Brand", 100);
    await inMemoryCarRepository.create(car);

    await expect(
      createRentalUseCase.execute({
        userId: "123",
        carId: "123",
        expectedReturnDate: dayjs().toDate(),
      })
    ).rejects.toEqual(new Error("Invalid return time"));
  });
});
