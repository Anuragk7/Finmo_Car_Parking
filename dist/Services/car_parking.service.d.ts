import { Car } from 'src/Entities/car.entity';
export declare class ParkingService {
    private parkingLot;
    constructor();
    initializeParkingLot(size: number): number;
    expandParkingLot(count: number): number;
    parkCar(car: Car): number;
    freeSlot(input: number | string): number;
}
