import { ParkingService } from '../Services/car_parking.service';
import { Car } from '../Entities/car.entity';

describe('ParkingService', () => {
  let service: ParkingService;

  beforeEach(() => {
    service = new ParkingService();
  });

  it('should initialize the parking lot', () => {
    const totalSlots = service.initializeParkingLot(3);
    expect(totalSlots).toBe(3);
  });

  it('should park a car and return the assigned slot number', () => {
    service.initializeParkingLot(2);
    const car = new Car('KA-01-HH-1234', 'White', 0);
    const slot = service.parkCar(car);
    expect(slot).toBe(1);
  });

  it('should return -1 when parking lot is full', () => {
    service.initializeParkingLot(1);
    service.parkCar(new Car('KA-01-HH-1234', 'White', 0));
    const slot = service.parkCar(new Car('KA-01-HH-9999', 'Black', 0));
    expect(slot).toBe(-1);
  });

  it('should free a slot by slot number', () => {
    service.initializeParkingLot(2);
    const car = new Car('KA-01-HH-1234', 'White', 0);
    const slot = service.parkCar(car);
    const freedSlot = service.freeSlot(slot);
    expect(freedSlot).toBe(slot);
  });

  it('should free a slot by car registration number', () => {
    service.initializeParkingLot(2);
    const car = new Car('KA-01-HH-1234', 'White', 1);
    const slot = service.parkCar(car);
    const freedSlot = service.freeSlot(car.car_reg_no);
    expect(freedSlot).toBe(slot);
  });

  it('should return registration numbers by car color', () => {
    service.initializeParkingLot(3);
    service.parkCar(new Car('KA-01-HH-1234', 'White', 1));
    service.parkCar(new Car('KA-01-HH-9999', 'White', 2));
    const regNos = service.getCarsByColor('White');
    expect(regNos).toContain('KA-01-HH-1234');
    expect(regNos).toContain('KA-01-HH-9999');
  });

  it('should return slot numbers by car color', () => {
    service.initializeParkingLot(3);
    const car1 = new Car('KA-01-HH-1234', 'White', 1);
    const car2 = new Car('KA-01-HH-9999', 'White', 2);
    service.parkCar(car1);
    service.parkCar(car2);
    const slots = service.getSlotNumbersByColor('White');
    expect(slots).toContain(car1.car_slot);
    expect(slots).toContain(car2.car_slot);
  });

  it('should return current parking status', () => {
    service.initializeParkingLot(2);
    const car1 = new Car('KA-01-HH-1234', 'White', 1);
    const car2 = new Car('KA-01-HH-9999', 'Black', 2);
    service.parkCar(car1);
    service.parkCar(car2);
    const status = service.getParkingStatus();
    expect(status.length).toBe(2);
    expect(status.map(c => c.car_reg_no)).toContain('KA-01-HH-1234');
  });

  it('should expand the parking lot and allow more cars to be parked', () => {
    service.initializeParkingLot(1);
    service.parkCar(new Car('KA-01-HH-1234', 'White', 0));
    service.expandParkingLot(2);
    const newCarSlot = service.parkCar(new Car('KA-01-HH-5678', 'Black', 0));
    expect(newCarSlot).toBe(2);
  });
});
