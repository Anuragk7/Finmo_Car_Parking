// app.controller.ts

import { Controller, Get, Post, Patch, Put } from '@nestjs/common';

@Controller({})

export class ParkingController {
  @Get()
  getUser() {
    return 'I am a great person';
  }
}