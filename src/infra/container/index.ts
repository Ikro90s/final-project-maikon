import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository";

const container = new Container();

container.bind<ICarRepository>(TYPES.ICarRepository).to(PrismaCarRepository);
container.bind<IRentalRepository>(TYPES.IRentalRepository).to(PrismaRentalRepository);

export { container };
