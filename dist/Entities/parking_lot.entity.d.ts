import { Car } from './car.entity';
import MinHeap from 'heap-js';
export declare class ParkingLot {
    availableSlots: MinHeap<number>;
    carColorMap: Map<string, Set<Car>>;
    totalSlots: number;
    slotMap: Map<Number, Car>;
    carMap: Map<String, Car>;
    constructor(initialSize: number);
    expandLot(count: number): void;
}
