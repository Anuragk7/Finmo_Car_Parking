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
        if (!body.no_of_slot || body.no_of_slot <= 0) {
            throw new common_1.BadRequestException('Invalid or missing "no_of_slot" value.');
        }
        const totalSlots = this.parkingService.initializeParkingLot(body.no_of_slot);
        return { total_slot: totalSlots };
    }
    parkCar(body) {
        const { car_reg_no, car_color } = body;
        if (!car_reg_no || !car_color) {
            throw new common_1.BadRequestException('Both car_reg_no and car_color are required');
        }
        const car = new car_entity_1.Car(car_reg_no, car_color, 0);
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
    getCarsByColor(color) {
        const carRegistrationNumbers = this.parkingService.getCarsByColor(color);
        if (carRegistrationNumbers.length === 0) {
            throw new common_1.BadRequestException(`No cars found with color: ${color}`);
        }
        return carRegistrationNumbers;
    }
    getSlotNumbersByColor(color) {
        const slotNumbers = this.parkingService.getSlotNumbersByColor(color);
        if (slotNumbers.length === 0) {
            throw new common_1.BadRequestException(`No cars found with color: ${color}`);
        }
        return slotNumbers;
    }
    incrementParkingLot(body) {
        if (body.increment_slot === undefined || body.increment_slot <= 0) {
            throw new common_1.BadRequestException('The increment_slot parameter is required and must be a positive number');
        }
        const totalSlots = this.parkingService.expandParkingLot(body.increment_slot);
        return { total_slot: totalSlots };
    }
    getStatus() {
        const occupiedSlots = this.parkingService.getParkingStatus();
        return occupiedSlots;
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
__decorate([
    (0, common_1.Get)('/registration_numbers/:color'),
    __param(0, (0, common_1.Param)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "getCarsByColor", null);
__decorate([
    (0, common_1.Get)('/slot_numbers/:color'),
    __param(0, (0, common_1.Param)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "getSlotNumbersByColor", null);
__decorate([
    (0, common_1.Patch)('/parking_lot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "incrementParkingLot", null);
__decorate([
    (0, common_1.Get)('/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParkingController.prototype, "getStatus", null);
exports.ParkingController = ParkingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [car_parking_service_1.ParkingService])
], ParkingController);
//# sourceMappingURL=parking.controller.js.map