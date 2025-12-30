import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository";

import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";

const container = new Container();

container.bind<ICarRepository>(TYPES.ICarRepository).to(PrismaCarRepository);
container.bind<IRentalRepository>(TYPES.IRentalRepository).to(PrismaRentalRepository);
container.bind(CreateRentalUseCase).toSelf();

export { container };
