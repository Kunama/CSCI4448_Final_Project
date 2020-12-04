//firebase config
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

const user = new User()

let locationsDirectory = new Locations(user);

// https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml
// https://stackoverflow.com/questions/38132510/equivalent-to-load-without-jquery
const goToPage = (page) => {
    fetch(`/${page}.html`)
    .then(function(response) {
        return response.text();
    })
    .then(function(body) {
        document.querySelector('#main').innerHTML = body;
        let scripts = document.getElementById("main").getElementsByTagName("script");
        for(let script of scripts){
            eval(script.text)
        }
    });
}

// Initial load of locations when the application starts
db.collection("locations").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    let childData = doc.data();
    // console.log(childData)
    locationObject = new Location(
      childData.name,
      childData.latitude,
      childData.longitude,
      childData.type,
      true,
      childData.openTime,
      childData.closeTime,
    )
    locationsDirectory.addLocation(locationObject);
  });
  goToPage('location');
});

console.log("===============")
console.log(locationsDirectory)
console.log("===============")

