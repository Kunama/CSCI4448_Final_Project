// Singleton Tab
const Tab = {
    location: 'selectedLocation',
    user: null,
    isOpen: true,
    close: () => {
        console.log("hi")
        this.isOpen = false
        Tab.displayClosedTab()
    },
    displayClosedTab: () => {
        db.collection("tabs").doc("UserTab").delete().then(() => {
          const main = document.getElementById('main');
        main.innerHTML = 'Payment Complete! <button onclick="location.reload()">Choose New Location</button>'
        })
    },
    displayTab: (user) => {
      this.user = user
      document.getElementById('currentLocation').innerHTML = `Selected ${this.user.chosenLocation.getType()}: ${this.user.chosenLocation.getName()}`

      // Observer pattern to watch for changes in DB and update view on change
      const unsubscribe = db.collection("tabs").doc("UserTab")
        .onSnapshot((doc) => {
          console.log("Doc!",doc)
          console.log("SIZE",doc.size)
          if(doc.exists == false){
            unsubscribe()
          }
          let currentItemData = doc.data().items
          this.user.order.clearItems();
          currentItemData.forEach(itemData => {
            let item = new Item(itemData.name, itemData.price)
            this.user.order.addToOrder(item)
          })
          let html = '<table class="table table-striped table-hover" width=100><tr><th>Item Name</th><th>Price</th></tr>'
          this.user.order.getItems().forEach((item) => {
              html += item.getHTML()
          })
          html += '</table>'
          console.log(html)
          const tabItemsHTML = document.getElementById('items');
          tabItemsHTML.innerHTML = html
        });
    },
};