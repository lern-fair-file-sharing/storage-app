

export enum LastModified {
    LAST_THREE_HOURS,
    TODAY,
    THIS_WEEK,
    OLDER
}


export function getTimeFrame(dateTimeString: string): LastModified {
    try {
        const dateTime = new Date(dateTimeString);
        const now = new Date();

        // Check if time is from the last 3 hours
        const threeHoursAgo = new Date(now.getTime() - (3 * 60 * 60 * 1000));
        if (dateTime >= threeHoursAgo) {
            return LastModified.LAST_THREE_HOURS;
        }

        // Check if time is from today
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (dateTime >= startOfToday) {
            return LastModified.TODAY;
        }

        // Check if time is from this week
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek.getTime() + (7 * 24 * 60 * 60 * 1000));
        if (dateTime >= startOfWeek && dateTime <= endOfWeek) {
            return LastModified.THIS_WEEK;
        }

        return LastModified.OLDER;
    } catch (error) {
        console.error(`Error: Could not parse date time string '${dateTimeString}'`, error);
        return LastModified.OLDER;
    }
}