import { Car } from './car.entity';
import MinHeap from 'heap-js';  // MinHeap for available slots (heap)

export class ParkingLot {
  availableSlots: MinHeap<number>;  // Heap to efficiently fetch the available slot
  carColorMap: Map<string, Set<Car>> = new Map();  // Map to store cars by color
  totalSlots: number = 0;  // Total number of slots
  slotMap: Map<Number, Car> = new Map();
  carMap: Map <String, Car> = new Map();

  constructor(initialSize: number) {
    this.totalSlots = initialSize;
    this.availableSlots = new MinHeap<number>((a, b) => a - b); // Comparator for heap (min-heap)

    // Initialize slots
    for (let i = 1; i <= initialSize; i++) {
      this.availableSlots.push(i);  // Push slot numbers to the heap
    }
  }

  // Expand parking lot by adding new slots
  expandLot(count: number) {
    for (let i = this.totalSlots + 1; i <= this.totalSlots + count; i++) {
      this.availableSlots.push(i);  // Push new slot numbers to the heap
    }
    this.totalSlots += count;  // Update total slot count
  }
}
