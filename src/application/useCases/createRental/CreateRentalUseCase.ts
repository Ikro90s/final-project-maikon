import "reflect-metadata";
import { inject, injectable } from "inversify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { Rental } from "../../../domain/entities/Rental";
import { TYPES } from "../../../infra/container/types";
import { v4 as uuidV4 } from "uuid";

dayjs.extend(utc);

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.ICarRepository)
    private carRepository: ICarRepository,
    @inject(TYPES.IRentalRepository)
    private rentalRepository: IRentalRepository
  ) {}

  async execute({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const minimumDuration = 24;

    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new Error("Car not found");
    }

    const carUnavailable = await this.rentalRepository.findOpenRentalByCarId(carId);

    if (carUnavailable) {
      throw new Error("Car is unavailable");
    }

    const userHasOpenRental = await this.rentalRepository.findOpenRentalByUserId(userId);

    if (userHasOpenRental) {
      throw new Error("There's a rental in progress for user!");
    }

    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectedReturnDate).utc().local().format();

    const diffInHours = dayjs(compare).diff(dateNow, "hours");

    if (diffInHours < minimumDuration) {
      throw new Error("Invalid return time");
    }

    const rental = new Rental(
      uuidV4(),
      carId,
      userId,
      new Date(),
      expectedReturnDate
    );

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailability(carId, false);

    return rental;
  }
}
