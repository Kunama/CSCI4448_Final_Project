class Locations {
    constructor(user) {
        this.locations = []
        this.user = user
    }

    addLocation(location) {
        this.locations.push(location)
        this.locations.sort(this.sortFunction(this.user))
    }

    //https://stackoverflow.com/questions/50698436/javascript-how-to-use-variable-in-sort-function
    sortFunction(user) {
        return function (a, b) {
            return a.getDistance(user) - b.getDistance(user)
        }
    }

    addLocationHTMLHelper(location, index) {
        return `<tr style="cursor: pointer;" onclick=locationsDirectory.selectLocation(${index})><td>${location.getName()}</td><td>${location.getType()}</td><td>${location.getDistance(this.user).toFixed(2)}</td><td>${(location.getStatus()) ? 'Yes' : 'No'}</td>`
    }

    displayLocations() {
        let html = '<table class="table table-striped table-hover" width=100%><tr class="thead-dark"><th>Name</th><th>Type</th><th>Distance</th><th>Is Open</th></tr>'
        this.locations.forEach((location, index) => {
            html += this.addLocationHTMLHelper(location, index)
        })
        html += '</table>'
        console.log(html)
        const locationsHTML = document.getElementById('locations');
        locationsHTML.innerHTML = html
    }

    displayLocationsWithinRadius(radius) {
        let html = '<table class="table table-striped" width=100%><tr class="thead-dark"><th>Name</th><th>Type</th><th>Distance</th><th>Is Open</th></tr>'
        this.locations.forEach((location, index) => {
            if (location.getDistance(this.user) <= radius) {
                html += this.addLocationHTMLHelper(location, index)
            }
        })
        html += '</table>'
        const locationsHTML = document.getElementById('locations');
        locationsHTML.innerHTML = html
    }

    selectLocation(index) {
        this.user.setChosenLocation(this.locations[index])
    }
}