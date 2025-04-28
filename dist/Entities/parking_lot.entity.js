"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
const heap_js_1 = require("heap-js");
class ParkingLot {
    availableSlots;
    carColorMap = new Map();
    totalSlots = 0;
    slotMap = new Map();
    carMap = new Map();
    constructor(initialSize) {
        this.totalSlots = initialSize;
        this.availableSlots = new heap_js_1.default((a, b) => a - b);
        for (let i = 1; i <= initialSize; i++) {
            this.availableSlots.push(i);
        }
    }
    expandLot(count) {
        for (let i = this.totalSlots + 1; i <= this.totalSlots + count; i++) {
            this.availableSlots.push(i);
        }
        this.totalSlots += count;
    }
}
exports.ParkingLot = ParkingLot;
//# sourceMappingURL=parking_lot.entity.js.map