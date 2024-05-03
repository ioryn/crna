const { DateTime } = require("luxon");

// Example of a properly implemented time parsing and formatting function
function formatTime(timeStr) {
    // Assuming the time string is in "HH:mm" format
    const time = DateTime.fromFormat(timeStr, "HH:mm", {zone: 'utc'});
    if (time.isValid) {
        // Correct formatting to 12-hour time with AM/PM
        return time.toLocaleString(DateTime.TIME_SIMPLE);
    } else {
        return timeStr; // Return the original string if the parsing fails
    }
}