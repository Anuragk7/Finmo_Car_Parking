// src/parking.controller.ts

import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ParkingService } from './Services/car_parking.service';
import { Car } from './Entities/car.entity';

@Controller()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  // 1. Initialize parking lot
  @Post('/parking_lot')
  initializeParkingLot(@Body() body: { no_of_slot: number }) {
    const totalSlots = this.parkingService.initializeParkingLot(body.no_of_slot);
    return { total_slot: totalSlots };
  }

  // 2. Allocate (park) car
  @Post('/park')
parkCar(@Body() body: { car_reg_no: string; car_color: string }) {
  const { car_reg_no, car_color } = body;

  // Basic validation
  if (!car_reg_no || !car_color) {
    throw new BadRequestException('Both car_reg_no and car_color are required');
  }

  // Check if the car with the same registration number already exists
  

  const car = new Car(car_reg_no, car_color, 0);
  const slotNumber = this.parkingService.parkCar(car);
  car.car_slot = slotNumber;

  if (slotNumber === -1) {
    throw new BadRequestException('Parking lot is full');
  }

  return { allocated_slot_number: slotNumber };
}


  // 3. Free a parking slot (clear)
  @Post('/clear')
  clearSlot(@Body() body: { slot_number?: number; car_reg_no?: string }) {
    if (!body.slot_number && !body.car_reg_no) {
      throw new BadRequestException('Provide either slot_number or car_reg_no');
    }

    const input = body.slot_number ?? body.car_reg_no!;
    const freedSlot = this.parkingService.freeSlot(input);

    if (freedSlot === -1) {
      throw new BadRequestException('Slot already free or Car not found');
    }

    return { freed_slot_number: freedSlot };
  }
}
