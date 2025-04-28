"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const common_1 = require("@nestjs/common");
const parking_lot_entity_1 = require("../Entities/parking_lot.entity");
let ParkingService = class ParkingService {
    parkingLot;
    constructor() {
        this.parkingLot = new parking_lot_entity_1.ParkingLot(0);
    }
    initializeParkingLot(size) {
        this.parkingLot = new parking_lot_entity_1.ParkingLot(size);
        return this.parkingLot.totalSlots;
    }
    expandParkingLot(count) {
        this.parkingLot.expandLot(count);
        return this.parkingLot.totalSlots;
    }
    parkCar(car) {
        const availableSlot = this.parkingLot.availableSlots.pop();
        if (!availableSlot) {
            return -1;
        }
        if (!this.parkingLot.carColorMap.has(car.car_color)) {
            this.parkingLot.carColorMap.set(car.car_color, new Set());
        }
        this.parkingLot.carColorMap.get(car.car_color).add(car);
        this.parkingLot.carMap.set(car.car_reg_no, car);
        this.parkingLot.slotMap.set(availableSlot, car);
        return availableSlot;
    }
    freeSlot(input) {
        if (typeof input === 'number') {
            const car = this.parkingLot.slotMap.get(input);
            if (car) {
                const regNo = car.car_reg_no;
                this.parkingLot.carMap.delete(regNo);
                this.parkingLot.slotMap.delete(input);
                this.parkingLot.availableSlots.push(input);
                return input;
            }
            else {
                return -1;
            }
        }
        else {
            const car = this.parkingLot.carMap.get(input);
            if (car) {
                const slot = car.car_slot;
                this.parkingLot.slotMap.delete(slot);
                this.parkingLot.carMap.delete(input);
                this.parkingLot.availableSlots.push(slot);
                return slot;
            }
            else {
                return -1;
            }
        }
    }
};
exports.ParkingService = ParkingService;
exports.ParkingService = ParkingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ParkingService);
//# sourceMappingURL=car_parking.service.js.map