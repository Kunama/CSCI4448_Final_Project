class Location {
    constructor(name, latitude, longitude, type, isOpen, openTime, closeTime) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.isOpen = isOpen;
        this.closeTime = closeTime;
        this.openTime = openTime;
    }
    getName() {
        return this.name
    }
    getType() {
        return this.type
    }
    getStatus() {
        const datetimeNow = new Date();
        const timeNow = datetimeNow.getHours();
        console.log(timeNow, this.closeTime, this.openTime)
        if (timeNow >= this.closeTime && timeNow < this.openTime) {
            return false
        }
        if (!this.isOpen) {
            return false
        }
        return true
    }
    getDistanceHelper(lat1, long1, lat2, long2) {
        var R = 6371;
        var lat = (lat2 - lat1) * (Math.PI / 180);
        var long = (long2 - long1) * (Math.PI / 180);
        var a =
            Math.sin(lat / 2) * Math.sin(lat / 2) +
            Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
            Math.sin(long / 2) * Math.sin(long / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    getDistance(user) {
        return this.getDistanceHelper(this.latitude, this.longitude, user.latitude, user.longitude)
    }
    //https://www.geodatasource.com/developers/javascript
}
