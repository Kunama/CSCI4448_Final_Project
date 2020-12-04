class Bartender{
  addToOrder(){
    let itemName = document.getElementById("itemName").value
    document.getElementById("itemName").value = ""
    let price = document.getElementById("price").value
    document.getElementById("price").value = ""
    const item = new Item(itemName, price)
    this.storeInDatabase(item)
  }

  // Inserts the new item to the bar tab in Firebase
  storeInDatabase(item) {
    db.collection("tabs").doc("UserTab").get().then((tab) => {
        let oldData = tab.data();
        oldData.items.push({
          "name": item.name,
          "price": item.price
        });
        db.collection("tabs").doc("UserTab").set(oldData).then((a) => console.log(a))
    });
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBlYOpyjFGLJhpFPMZuvs-lbaOLTmWb0rE",
  authDomain: "csci4448.firebaseapp.com",
  projectId: "csci4448",
  storageBucket: "csci4448.appspot.com",
  messagingSenderId: "144532305149",
  appId: "1:144532305149:web:596be4f4eb55e583633a94"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

bartender = new Bartender()