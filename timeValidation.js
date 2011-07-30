function validateTime(element) {
var hourString = null, minuteString = null, ampmString = null, totalString = timeString, hour, timeString = element.value;
    timeString = timeString.replace(/\s/, "");
    if (timeString === "") {
        element.title = "";
        element.className = element.className.replace(/invalid/g, "");
    return true;
    }


    if (timeString.match(/^[0-9]{1,4}$/)) {
        if (timeString.length === 1 || timeString.length === 2) {
            hourString = getHourByHour(timeString);
            ampmString = getAMPMByHour(timeString);
        }
        else if (timeString.length === 3) {
            hourString = getHourByHour(timeString.substring(0, 1));
            ampmString = getAMPMByHour(timeString.substring(0, 1));
            minuteString = timeString.substring(1, 3);
        }
        else if (timeString.length === 4) {
            hourString = getHourByHour(timeString.substring(0, 2));
            ampmString = getAMPMByHour(timeString.substring(0, 2));
            minuteString = timeString.substring(2, 4);
        }
    }
    else if (timeString.match(/^\d\d:\d\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 2));
        minuteString = timeString.substring(3, 5);
        ampmString = getAMPMByampm(timeString.substring(5, timeString.length));
    }
    else if (timeString.match(/^\d:\d\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 1));
        minuteString = timeString.substring(2, 4);
        ampmString = getAMPMByampm(timeString.substring(4, timeString.length));
    }
    else if (timeString.match(/^\d\d:\d\d$/)) {
        hourString = getHourByHour(timeString.substring(0, 2));
        ampmString = getAMPMByHour(timeString.substring(0, 2));
        minuteString = timeString.substring(3, 5);
    }
    else if (timeString.match(/^\d:\d\d$/)) {
        hourString = getHourByHour(timeString.substring(0, 1));
        ampmString = getAMPMByHour(timeString.substring(0, 1));
        minuteString = timeString.substring(2, 4);
    }
    else if (timeString.match(/^\d\d\d\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 2));
        minuteString = timeString.substring(2, 4);
        ampmString = getAMPMByampm(timeString.substring(4, timeString.length));
    }
    else if (timeString.match(/^\d\d\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 1));
        minuteString = timeString.substring(1, 3);
        ampmString = getAMPMByampm(timeString.substring(3, timeString.length));
    }
    else if (timeString.match(/^\d\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 2));
        ampmString = getAMPMByampm(timeString.substring(2, timeString.length));
    }
    else if (timeString.match(/^\d[A-Za-z]{1,2}$/)) {
        hourString = getHourByHour(timeString.substring(0, 1));
        ampmString = getAMPMByampm(timeString.substring(1, timeString.length));
    }

    if (minuteString === null || parseInt(minuteString) < 0 || parseInt(minuteString) >= 60) {
        minuteString = "00";
    }
    hour = parseInt(hourString);
    if(hour > 12 && ampmString === "PM") {
        hourString = "";
        ampmString = "";
    }
    else if (hour > 12) {
        hour -= 12;
        if (hour > 0 && hour < 10) {
            hourString = "0" + hour;
        }
        else if (hour >= 10 && hour < 12) {
            hourString = "" + hour;
        }
        else {
            hourString = "";
        }
        ampmString = "PM";
    }


    totalString = "" + hourString + ":" + minuteString + " " + ampmString;

    if (totalString.match(/\d\d:\d\d\s(AM|PM)/)) {
        element.title = "";
        element.className = element.className.replace(/invalid/g, "");
        element.value = totalString;
        element.className += " success";
        setTimeout(function(){done(element);},5000); 
        return true;
    }
    else {
        element.title = "Please enter a time in the format hh:mm AM/PM";
        element.className += " invalid";
        return false;
    }

}

function done(element) {
	element.className = element.className.replace(/success/g, "");
}

function getAMPMByHour(hour) {
    if (hour.length === 2 && hour.substring(0, 1) === "0") {
        hour = parseInt(hour.substring(1, 2));
    }
    else {
        hour = parseInt(hour);
    }
    var returnString = null;
    if ((hour >= 7 && hour < 12) || hour === 0) {
        returnString = "AM";
    }
    else if (hour < 7 && hour > 0 || hour === 12) {
        returnString = "PM";
    }
    else {
        returnString = "";
    }
    return returnString;
}

function getAMPMByampm(ampmString) {
    if (ampmString.length === 1) {
        if (ampmString.match(/^(a|A)$/)) {
            ampmString = "AM";
        }
        else if (ampmString.match(/^(p|P)$/)) {
            ampmString = "PM";
        }
        else {
            ampmString = "";
        }
    }
    else if (ampmString.length === 2) {
        if (ampmString.match(/^(am|AM|aM|Am)$/)) {
            ampmString = "AM";
        }
        else if (ampmString.match(/^(pm|pM|Pm|PM)$/)) {
            ampmString = "PM";
        }
        else {
            ampmString = "";
        }
    }
    else {
        ampmString = "";
    }
    return ampmString;
}

function getHourByHour(hour) {
    if (hour.length === 2 && hour.substring(0, 1) === "0") {
        hour = parseInt(hour.substring(1, 2));
    }
    else {
        hour = parseInt(hour);
    }

    if (hour === 0) {
        hour = "12";
    }
    else if (hour > 0 && hour < 10) {
        hour = "0" + hour;
    }
    else if (hour >= 10 && hour < 24) {
        hour = "" + hour;
    }
    else {
        hour = "";
    }
    return hour;
}