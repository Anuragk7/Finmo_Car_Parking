// src/parking.controller.ts

import { Body, Controller, Post,Get, BadRequestException, Param, Patch } from '@nestjs/common';
import { ParkingService } from '../Services/car_parking.service';
import { Car } from '../Entities/car.entity';

@Controller()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  // 1. Initialize parking lot
  @Post('/parking_lot')
  initializeParkingLot(@Body() body: { no_of_slot: number }) {
    if (!body.no_of_slot || body.no_of_slot <= 0) {
      // If the number of slots is not provided or is invalid (<= 0)
      throw new BadRequestException('Invalid or missing "no_of_slot" value.');
    }

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
  @Get('/registration_numbers/:color')
  getCarsByColor(@Param('color') color: string) {
    const carRegistrationNumbers = this.parkingService.getCarsByColor(color);

    if (carRegistrationNumbers.length === 0) {
      throw new BadRequestException(`No cars found with color: ${color}`);
    }

    return carRegistrationNumbers;
  }
  @Get('/slot_numbers/:color')
  getSlotNumbersByColor(@Param('color') color: string) {
    const slotNumbers = this.parkingService.getSlotNumbersByColor(color);

    if (slotNumbers.length === 0) {
      throw new BadRequestException(`No cars found with color: ${color}`);
    }

    return slotNumbers;
  }

  @Patch('/parking_lot')
  incrementParkingLot(@Body() body: { increment_slot: number }) {
    if (body.increment_slot === undefined || body.increment_slot <= 0) {
      throw new BadRequestException('The increment_slot parameter is required and must be a positive number');
    }

    const totalSlots = this.parkingService.expandParkingLot(body.increment_slot);
    return { total_slot: totalSlots };
  }
  // 7 
  @Get('/status')
  getStatus() {
      
      const occupiedSlots = this.parkingService.getParkingStatus()
      

      return occupiedSlots;
  }
}




