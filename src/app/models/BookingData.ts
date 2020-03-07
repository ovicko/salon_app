import { SalonServices } from './SalonServices';

export class BookingData {
    customerId:number;
    bookedServices:SalonServices[]
    salonId:number;
    total:number;
    bookingDate:string;
}