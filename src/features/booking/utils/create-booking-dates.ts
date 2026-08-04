import type {BookingDate} from "../types/booking-date";

function createDateId(date: Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");

    return `${year}-${month}-${day}`;
}

export function createBookingDates(numberOfDays = 7,):BookingDate[]{
    const today = new Date();
    
    today.setHours(12,0,0,0);

    return Array.from({length:numberOfDays},(_,index)=>{
        const date = new Date(today);

        date.setDate(today.getDate() + index);

        return{
            id: createDateId(date),
            date,
            weekdayLabel: new Intl.DateTimeFormat("sq-AL",{
                weekday: "short",
            }).format(date),
            dayLabel: new Intl.DateTimeFormat("sq-AL",{
                day: "numeric",
            }).format(date),
            monthLabel: new Intl.DateTimeFormat("sq-AL",{
                month: "short",
            }).format(date),
            isToday: index === 0,
        };
    },
    );
}