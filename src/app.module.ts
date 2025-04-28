// src/app.module.ts

import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './Services/car_parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class AppModule {}
