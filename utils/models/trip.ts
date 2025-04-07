export interface Trip {
    id?: string; 
    creator: string;
    from: string; 
    to: string; 
    departure_time: string; 
    flexibility_window: number; 
    total_fare: number;
    vehicle_model: string;
    capacity: number;
    seats_available: number;
    fuel_type: string;
    ac: boolean;
    notes?: string;
    created_at: string; 
    updated_at: string; 
  }
  