export class Rental {
  constructor(
    public readonly id: string,
    public readonly carId: string,
    public readonly userId: string,
    public readonly startDate: Date,
    public readonly expectedReturnDate: Date,
    public returnDate?: Date,
    public total?: number
  ) {}
}
