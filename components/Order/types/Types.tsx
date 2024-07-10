export type PackageType =
  | "Electronics"
  | "Food"
  | "Fragile"
  | "Clothes"
  | "Documents"
  | "Bulky Items"
  | "Others";

export type TripStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export type TripStage = 1 | 2 | 3 | 4;

export type TripArea = "Accra" | "Kumasi" | "Inter City";

export type TripMedium = "Motor" | "Car" | "Truck";

export type TripType = "Next Day" | "Same Day" | "Scheduled";
