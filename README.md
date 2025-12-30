# RentX - Clean Architecture Vehicle Rental System

## Purpose

This project implements the core domain of a vehicle rental system using **Clean Architecture** principles, **Domain-Driven Design (DDD)**, and **Inversion of Control (IoC)** with InversifyJS. It demonstrates how to decouple the domain rules from infrastructure concerns (like databases).

## Architecture Overview

The project is organized into layers:

- **Domain**: Enterprise business rules (Entities: `Car`, `Rental`) and Repository Interfaces. Pure TypeScript, no dependencies.
- **Application**: Application business rules (Use Cases: `CreateRentalUseCase`). Depends only on Domain.
- **Infra**: Frameworks & Drivers. Concrete implementations of repositories (`PrismaCarRepository`) and IoC Container configuration.
- **Adapters**: Entry points. CLI (`main.ts`) adapter to invoke the application.

## Technologies

- **Language**: TypeScript
- **ORM**: Prisma (SQLite)
- **IoC**: InversifyJS
- **Testing**: Vitest (Unit Tests with InMemory Repositories)

## Installation and execution

### Prerequisites

- Node.js (v18+)
- npm

### Setup

1. Clone the repository

   ```bash
   git clone git@github.com:Ikro90s/final-project-maikon.git
   cd final-project-maikon
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Setup Database (SQLite)
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Application (CLI)

To run the CLI application which creates a car and registers a rental:

```bash
npx tsx src/adapters/cli/main.ts
```

### Running Tests

To run unit tests (using InMemory repositories):

```bash
npm run test
# OR
npx vitest run
```
