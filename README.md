# Parking Lot API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Design Choices](#design-choices)
- [Setup Guide](#setup-guide)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Home](#home)
  - [Initialize Parking Lot](#initialize-parking-lot)
  - [Park a Car](#park-a-car)
  - [Free a Parking Slot](#free-a-parking-slot)
  - [Get Car Registration Numbers by Color](#get-car-registration-numbers-by-color)
  - [Get Slot Numbers by Color](#get-slot-numbers-by-color)
  - [Expand Parking Lot](#expand-parking-lot)
  - [Get Parking Lot Status](#get-parking-lot-status)
- [Error Handling](#error-handling)
- [Notes](#notes)
- [Example Workflow](#example-workflow)

## Introduction
The Parking Lot API is a RESTful service designed to manage a parking lot system. It allows users to initialize a parking lot, park cars, free slots, query cars by color, and check the parking lot status. Built with NestJS and TypeScript, the API provides a robust and scalable solution for parking lot management, with clear error handling and validation.

## Live Links
- **API Deployment:** https://finmocarparking-production.up.railway.app
- **Docker Image:** https://hub.docker.com/r/anuragk777/finmo_car_parking-server

## Design Choices
- **Data Structures & Time Complexity**: Used heap for **log(n)** time for allocating and deallocating slots, sets and maps for **O(1)** for fetching cars or slots by color .
- **Dependency Injection**: For Modularity and separation of concerns.
- **Error Handling**: Comprehensive validation ensures that invalid inputs (e.g., missing fields, negative slot numbers) result in clear error messages with HTTP 400 status codes.
- **Unit Tests**: Unit tests return test the main controller and Service Provider.

## Setup Guide
To set up and run the Parking Lot API locally, follow these steps:

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher
- **NestJS CLI**: Install globally with `npm install -g @nestjs/cli`

### Steps
1. **Clone the Repository** (if applicable):
   ```bash
   git clone https://github.com/Anuragk7/Finmo_Car_Parking
   cd Finmo_Car_Parking
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Project Structure**:
   Ensure the following files are present:
   - `src/parking.controller.ts`: Contains the API endpoints.
   - `src/Services/car_parking.service.ts`: Implements the business logic.
   - `src/Entities/car.entity.ts`: Defines the `Car` entity.

4. **Environment Configuration**:
   - Create a's `.env` file (if needed) for configuration, though the current setup uses in-memory storage and requires no external configuration.
   - Example `.env` (optional):
     ```
     PORT=3000
     ```

5. **Run the Application**:
   - Development mode (with hot reload):
     ```bash
     npm run start:dev
     ```
   - Production mode:
     ```bash
     npm run start:prod
     ```

6. **Access the API**:
   - The API will be available at `http://localhost:3000` (or the port specified in `.env`).
   - Test the home endpoint:
     ```bash
     curl http://localhost:3000/
     ```

7. **Testing** (Optional):
   - Install testing dependencies (if not already included):
     ```bash
     npm install --save-dev @nestjs/testing jest
     ```
   - Run tests:
     ```bash
     npm run test
     ```

### Notes
- Ensure the `ParkingService` and `Car` entity are correctly implemented to match the controller's expectations.
- For production, consider adding a database (e.g., PostgreSQL with TypeORM) and configuring environment variables for security.

## Base URL
All API endpoints are relative to the base URL: `/`

## Endpoints

### Home
- **Endpoint**: `GET /`
- **Description**: Returns a welcome message for the parking lot API.
- **Response**:
  - **200 OK**: 
    ```json
    "Welcome to the parking lot"
    ```
- **Example**:
  ```bash
  curl http://localhost:3000/
  ```

### Initialize Parking Lot
- **Endpoint**: `POST /parking_lot`
- **Description**: Initializes a parking lot with a specified number of slots.
- **Request Body**:
  ```json
  {
    "no_of_slot": number
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "total_slot": number
    }
    ```
  - **400 Bad Request**: If `no_of_slot` is missing or `<= 0`.
    ```json
    {
      "message": "Invalid or missing \"no_of_slot\" value."
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/parking_lot -H "Content-Type: application/json" -d '{"no_of_slot": 10}'
  ```

### Park a Car
- **Endpoint**: `POST /park`
- **Description**: Allocates a parking slot for a car based on its registration number and color.
- **Request Body**:
  ```json
  {
    "car_reg_no": string,
    "car_color": string
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "allocated_slot_number": number
    }
    ```
  - **400 Bad Request**: If `car_reg_no` or `car_color` is missing, or if the parking lot is full.
    ```json
    {
      "message": "Both car_reg_no and car_color are required"
    }
    ```
    or
    ```json
    {
      "message": "Parking lot is full"
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/park -H "Content-Type: application/json" -d '{"car_reg_no": "ABC123", "car_color": "Blue"}'
  ```

### Free a Parking Slot
- **Endpoint**: `POST /clear`
- **Description**: Frees a parking slot by either slot number or car registration number.
- **Request Body**:
  ```json
  {
    "slot_number": number (optional),
    "car_reg_no": string (optional)
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "freed_slot_number": number
    }
    ```
  - **400 Bad Request**: If neither `slot_number` nor `car_reg_no` is provided, or if the slot is already free/car not found.
    ```json
    {
      "message": "Provide either slot_number or car_reg_no"
    }
    ```
    or
    ```json
    {
      "message": "Slot already free or Car not found"
    }
    ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/clear -H "Content-Type: application/json" -d '{"slot_number": 1}'
  ```

### Get Car Registration Numbers by Color
- **Endpoint**: `GET /registration_numbers/:color`
- **Description**: Retrieves registration numbers of all cars with the specified color.
- **Parameters**:
  - `color` (path): The color of the cars to query (e.g., `Blue`).
- **Response**:
  - **200 OK**: 
    ```json
    ["ABC123", "XYZ789"]
    ```
  - **400 Bad Request**: If no cars are found with the specified color.
    ```json
    {
      "message": "No cars found with color: Blue"
    }
    ```
- **Example**:
  ```bash
  curl http://localhost:3000/registration_numbers/Blue
  ```

### Get Slot Numbers by Color
- **Endpoint**: `GET /slot_numbers/:color`
- **Description**: Retrieves slot numbers of all cars with the specified color.
- **Parameters**:
  - `color` (path): The color of the cars to query (e.g., `Blue`).
- **Response**:
  - **200 OK**: 
    ```json
    [1, 3, 5]
    ```
  - **400 Bad Request**: If no cars are found with the specified color.
    ```json
    {
      "message": "No cars found with color: Blue"
    }
    ```
- **Example**:
  ```bash
  curl http://localhost:3000/slot_numbers/Blue
  ```

### Expand Parking Lot
- **Endpoint**: `PATCH /parking_lot`
- **Description**: Increases the number of parking slots by the specified amount.
- **Request Body**:
  ```json
  {
    "increment_slot": number
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "total_slot": number
    }
    ```
  - **400 Bad Request**: If `increment_slot` is missing or `<= 0`.
    ```json
    {
      "message": "The increment_slot parameter is required and must be a positive number"
    }
    ```
- **Example**:
  ```bash
  curl -X PATCH http://localhost:3000/parking_lot -H "Content-Type: application/json" -d '{"increment_slot": 5}'
  ```

### Get Parking Lot Status
- **Endpoint**: `GET /status`
- **Description**: Retrieves the current status of the parking lot, including occupied slots and parked cars.
- **Response**:
  - **200 OK**: Returns a list of occupied slots with car details (format depends on implementation, e.g., array of objects with slot number, car registration, and color).
    ```json
    [
      {
        "slot_number": 1,
        "car_reg_no": "ABC123",
        "car_color": "Blue"
      },
      ...
    ]
    ```
- **Example**:
  ```bash
  curl http://localhost:3000/status
  ```

## Error Handling
- All endpoints return a `400 Bad Request` status with a JSON object containing a `message` field when invalid input is provided or an operation cannot be completed.
- Example error response:
  ```json
  {
    "message": "Invalid or missing input"
  }
  ```

## Notes
- The API assumes a NestJS backend with TypeScript, using the `ParkingService` for business logic.
- Ensure the parking lot is initialized (`POST /parking_lot`) before attempting to park cars or query status.
- The `Car` entity is defined with properties: `car_reg_no` (string), `car_color` (string), and `car_slot` (number).

## Example Workflow
1. Initialize a parking lot with 10 slots:
   ```bash
   curl -X POST http://localhost:3000/parking_lot -H "Content-Type: application/json" -d '{"no_of_slot": 10}'
   ```
2. Park a car:
   ```bash
   curl -X POST http://localhost:3000/park -H "Content-Type: application/json" -d '{"car_reg_no": "ABC123", "car_color": "Blue"}'
   ```
3. Check status:
   ```bash
   curl http://localhost:3000/status
   ```
4. Free a slot:
   ```bash
   curl -X POST http://localhost:3000/clear -H "Content-Type: application/json" -d '{"slot_number": 1}'
   ```
