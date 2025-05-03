/* eslint-disable @typescript-eslint/no-explicit-any */

export const categorizeTimes = (times: any[]) => {
    const time:any = {
        morning: [],
        afternoon: [],
        night: []
    };

    for (let i = 0; i < times.length; i++) {
        // Splitting the time string into hours and minutes
        const [hours, minutes] = times[i].split(':').map(Number);
        const totalMinutes = hours * 60 + minutes; // Convert time to minutes for comparison

        if (totalMinutes < 13 * 60) {
            time.morning.push(times[i]);
        } else if (totalMinutes < 18 * 60) {
            time.afternoon.push(times[i]);
        } else {
            time.night.push(times[i]);
        }
    }
    
    return time;
}
