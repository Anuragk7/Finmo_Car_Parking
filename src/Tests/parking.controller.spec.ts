import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from '../Controllers/parking.controller';
import { ParkingService } from '../Services/car_parking.service';
import { BadRequestException } from '@nestjs/common';

const mockParkingService = {
  initializeParkingLot: jest.fn(),
  parkCar: jest.fn(),
  freeSlot: jest.fn(),
  getCarsByColor: jest.fn(),
  getSlotNumbersByColor: jest.fn(),
  expandParkingLot: jest.fn(),
  getParkingStatus: jest.fn(),
};

describe('ParkingController', () => {
  let controller: ParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: mockParkingService,
        },
      ],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('should initialize parking lot', () => {
    mockParkingService.initializeParkingLot.mockReturnValue(6);
    expect(controller.initializeParkingLot({ no_of_slot: 6 })).toEqual({ total_slot: 6 });
  });

  it('should throw if no_of_slot is not provided', () => {
    expect(() => controller.initializeParkingLot({ no_of_slot: 0 })).toThrow(BadRequestException);
  });

  it('should park a car successfully', () => {
    mockParkingService.parkCar.mockReturnValue(1);
    const res = controller.parkCar({ car_reg_no: 'KA-01-AB-1234', car_color: 'White' });
    expect(res).toEqual({ allocated_slot_number: 1 });
  });

  it('should throw if parking lot is full', () => {
    mockParkingService.parkCar.mockReturnValue(-1);
    expect(() =>
      controller.parkCar({ car_reg_no: 'KA-01-AB-1234', car_color: 'White' }),
    ).toThrow(BadRequestException);
  });

  it('should throw if car_reg_no or car_color is missing', () => {
    expect(() => controller.parkCar({ car_reg_no: '', car_color: '' })).toThrow(BadRequestException);
  });

  it('should clear slot by slot_number', () => {
    mockParkingService.freeSlot.mockReturnValue(2);
    expect(controller.clearSlot({ slot_number: 2 })).toEqual({ freed_slot_number: 2 });
  });

  it('should throw if clear slot is not found', () => {
    mockParkingService.freeSlot.mockReturnValue(-1);
    expect(() => controller.clearSlot({ slot_number: 100 })).toThrow(BadRequestException);
  });

  it('should return registration numbers by color', () => {
    mockParkingService.getCarsByColor.mockReturnValue(['KA-01', 'KA-02']);
    expect(controller.getCarsByColor('white')).toEqual(['KA-01', 'KA-02']);
  });

  it('should throw if no cars found by color', () => {
    mockParkingService.getCarsByColor.mockReturnValue([]);
    expect(() => controller.getCarsByColor('pink')).toThrow(BadRequestException);
  });

  it('should return slot numbers by color', () => {
    mockParkingService.getSlotNumbersByColor.mockReturnValue([1, 5]);
    expect(controller.getSlotNumbersByColor('white')).toEqual([1, 5]);
  });

  it('should throw if no slots found by color', () => {
    mockParkingService.getSlotNumbersByColor.mockReturnValue([]);
    expect(() => controller.getSlotNumbersByColor('orange')).toThrow(BadRequestException);
  });

  it('should increment parking lot', () => {
    mockParkingService.expandParkingLot.mockReturnValue(9);
    expect(controller.incrementParkingLot({ increment_slot: 3 })).toEqual({ total_slot: 9 });
  });

  it('should throw if increment_slot is invalid', () => {
    expect(() => controller.incrementParkingLot({ increment_slot: -1 })).toThrow(BadRequestException);
  });

  it('should return parking lot status', () => {
    const status = [
      { slot_no: 1, registration_no: 'KA-01-HH-1234', color: 'Red' },
      { slot_no: 2, registration_no: 'KA-01-HH-1235', color: 'Blue' },
    ];
    mockParkingService.getParkingStatus.mockReturnValue(status);
    expect(controller.getStatus()).toEqual(status);
  });
});

