import { Injectable } from '@nestjs/common';
import { ParkingLot } from 'src/Entities/parking_lot.entity';
import { Car } from 'src/Entities/car.entity';

@Injectable()
export class ParkingService {
  private parkingLot: ParkingLot;

  constructor() {
    this.parkingLot = new ParkingLot(0); // Start with 0 slots, can be initialized later
  }

  // Initialize parking lot with a given size
  initializeParkingLot(size: number): number {
    this.parkingLot = new ParkingLot(size);
    return this.parkingLot.totalSlots;
  }

  // Expand parking lot by adding more slots
  expandParkingLot(count: number): number {
    this.parkingLot.expandLot(count);
    return this.parkingLot.totalSlots;
  }

  // Park car in the first available slot
  parkCar(car: Car): number {
    
    const availableSlot = this.parkingLot.availableSlots.pop();  // Get the smallest available slot (min-heap)

    if (!availableSlot) {
      return -1;
    }

    // Add car to the color map (using a Set for efficient addition and removal)
    if (!this.parkingLot.carColorMap.has(car.car_color)) {
      this.parkingLot.carColorMap.set(car.car_color, new Set());
    }
    this.parkingLot.carColorMap.get(car.car_color)!.add(car);
    this.parkingLot.cars.add(car)

    return availableSlot;
  }

  // Free a slot when car leaves
  freeSlot(slotNumber: number|string): number {
    if (typeof())
    return 0;
  }

  // Get all occupied slots
  getOccupiedSlots(): Slot[] {
    return this.parkingLot.slots.filter(slot => !slot.isAvailable());
  }

  // Get cars by color
  getCarsByColor(color: string): Car[] {
    return Array.from(this.parkingLot.carColorMap.get(color.toLowerCase()) || []);
  }

  // Get slot by car registration number
  getSlotByRegNo(regNo: string): number | null {
    const slot = this.parkingLot.slots.find(s => s.parkedCar?.car_reg_no === regNo);
    return slot ? slot.slot_number : null;
  }

  // Get all slots occupied by cars of a particular color
  getSlotsByColor(color: string): number[] {
    const cars = this.parkingLot.carColorMap.get(color.toLowerCase()) || [];
    return cars.map(car => this.getSlotByRegNo(car.car_reg_no)!).filter(Boolean) as number[];
  }
}
