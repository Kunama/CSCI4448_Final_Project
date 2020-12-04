class User {
    constructor() {
        this.latitude = 40.032240
        this.longitude = -105.260270
        this.order = new Order()
        // Make Tab observe order so it closes whenever order is paid
        this.order.subscribe(Tab)
    }
    setChosenLocation(location) {
        this.chosenLocation = location
        console.log(this.chosenLocation)
        this.displayTab()
    }
    displayTab() {
      db.collection("tabs").doc("UserTab").set({
        items: [],
        subTotal: 0,
        location: this.chosenLocation.getName(),
      }).then(() => {
        goToPage('tab')
      });
    }
}