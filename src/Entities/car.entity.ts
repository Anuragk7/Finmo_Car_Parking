export class Car {
    car_reg_no: string;  // Car Registration Number
    car_color: string;   // Car Color
    car_slot: number;
  
    constructor(car_reg_no: string, car_color: string, car_slot:number) {
      this.car_reg_no = car_reg_no;
      this.car_color = car_color;
      this.car_slot = car_slot;
    }
  }
  