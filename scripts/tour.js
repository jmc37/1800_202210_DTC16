var tourID = null

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        })

        // the following functions are always called when someone is logged in
        displaytour();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

// function showDetails() {
    // create a URL object
var params = new URL(window.location.href);
var id = params.searchParams.get("id");               //parse "id"
var title = params.searchParams.get("title");
// }

function displaytour() {

    //hardcoded for testing. replace it after indiv tourpage is done.
    // db.collection("Guides").doc("5fIBWAYO8ZfxcRuJhKRa").get()

    // db.collection("Guides").where("name", "==", __guideName or guideID _from_main_or_tourpage)
    db.collection("tours").where("tourID", "==", id)
    .get()
        .then(doc => {            
            console.log(doc)

            TourDocs = doc.docs;
            thisTour = TourDocs[0].data();
            //get the data fields of only one guide who is result of query
            console.log(thisTour);
            var tourtitle = thisTour.tourTitle;
            var tourcity = thisTour.city;
            var tour_description =thisTour.description;
            var tour_img = thisTour.tourImage;
            // var tourname = thisTour.name;
            // var tourbio = thisTour.Bio;
            // var tourlanguage = thisTour.languages;
            var tourID = thisTour.tourID;
            // var tour_details = thisTour.details;


            
            document.getElementById('tour_title').innerHTML = tourtitle;
            document.getElementById('city').innerHTML = tourcity;
            document.getElementById('description').innerHTML = tour_description;   
            document.getElementById('tour_img_').setAttribute("src", tour_img)
            document.getElementById('book_btn').onclick = () => savetour(tourID);
            // document.getElementById('bio').innerHTML = tourbio;
            // document.getElementById('language').innerHTML = tourlanguage;
            // document.getElementById('name').innerHTML = tourname;
            // document.getElementById('detail').innerHTML = tour_details;
            

        })
}


// displaytour()


function savetour(tourID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(tourID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Tour has been saved");
            // var iconID = 'save-' + hikeID;
            //console.log(iconID);
            document.getElementById('book_btn').innerText = 'booked';
        });
}















// function writeGuides() {
    //define a variable for the collection you want to create in Firestore to populate data
    // var GuideRef = db.collection("Guides");
    // GuideRef.get().then(doc => {
    //     x = doc.docs
    //     y = x[0].data();
    // console.log(y)
    // })

//     GuideRef.doc("5fIBWAYO8ZfxcRuJhKRa").set({
//         name: "Kyle G.",
//         city: "Vancouver",
//         description: "the city that Jesper loved..",
//         id: "0001",
//         title: "Amazing Vancouver Tour",
//         languages: "Tagalog",
//         Bio: "lorem lorem",
//         details:
//         "Day 1: Meeting at YVR airport, visit Stanley park. \
//         lorem ipsum lorem ipsum lorem ipsum \
//         Day 2: Visit Granville Island \
//         lorem ipsum lorem ipsum\
//         Day 3: Hiking to Joffre Lake"}),

        
//         {merge: true};

      
 
// };
// writeGuides()
// // citiesRef.doc("SF").set({
//    state: "CA"}, 
//  name: "San Francisco", state: "C1A", country: "USA",
//  capital: false, population: 860000,
//  regions: ["west_coast", "norcal"]},
// {merge: true});