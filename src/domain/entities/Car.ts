export class Car {
  constructor(
    public readonly id: string,
    public readonly licensePlate: string,
    public readonly model: string,
    public readonly dailyRate: number,
    public available: boolean = true
  ) {}
}
