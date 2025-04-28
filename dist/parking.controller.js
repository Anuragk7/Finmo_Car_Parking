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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingController = void 0;
const common_1 = require("@nestjs/common");
const car_parking_service_1 = require("./Services/car_parking.service");
const car_entity_1 = require("./Entities/car.entity");
let ParkingController = class ParkingController {
    parkingService;
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    initializeParkingLot(body) {
        const totalSlots = this.parkingService.initializeParkingLot(body.no_of_slot);
        return { total_slot: totalSlots };
    }
    parkCar(body) {
        const car = new car_entity_1.Car(body.car_reg_no, body.car_color, 0);
        const slotNumber = this.parkingService.parkCar(car);
        car.car_slot = slotNumber;
        if (slotNumber === -1) {
            throw new common_1.BadRequestException('Parking lot is full');
        }
        return { allocated_slot_number: slotNumber };
    }
    clearSlot(body) {
        if (!body.slot_number && !body.car_reg_no) {
            throw new common_1.BadRequestException('Provide either slot_number or car_reg_no');
        }
        const input = body.slot_number ?? body.car_reg_no;
        const freedSlot = this.parkingService.freeSlot(input);
        if (freedSlot === -1) {
            throw new common_1.BadRequestException('Slot already free or Car not found');
        }
        return { freed_slot_number: freedSlot };
    }
};
exports.ParkingController = ParkingController;
__decorate([
    (0, common_1.Post)('/parking_lot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "initializeParkingLot", null);
__decorate([
    (0, common_1.Post)('/park'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "parkCar", null);
__decorate([
    (0, common_1.Post)('/clear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "clearSlot", null);
exports.ParkingController = ParkingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [car_parking_service_1.ParkingService])
], ParkingController);
//# sourceMappingURL=parking.controller.js.map