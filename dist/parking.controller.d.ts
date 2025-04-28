import { ParkingService } from './Services/car_parking.service';
import { Car } from './Entities/car.entity';
export declare class ParkingController {
    private readonly parkingService;
    constructor(parkingService: ParkingService);
    initializeParkingLot(body: {
        no_of_slot: number;
    }): {
        total_slot: number;
    };
    parkCar(body: {
        car_reg_no: string;
        car_color: string;
    }): {
        allocated_slot_number: number;
    };
    clearSlot(body: {
        slot_number?: number;
        car_reg_no?: string;
    }): {
        freed_slot_number: number;
    };
    getCarsByColor(color: string): string[];
    getSlotNumbersByColor(color: string): number[];
    incrementParkingLot(body: {
        increment_slot: number;
    }): {
        total_slot: number;
    };
    getStatus(): Car[];
}
