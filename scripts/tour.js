var tourID = null

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        currentUser.get().then(userDoc => {
            var user_Name = userDoc.data().name;
            console.log(user_Name);
        })

    } else {
        console.log("No user is signed in");
    }
});


var params = new URL(window.location.href);
var id = params.searchParams.get("id");
var title = params.searchParams.get("title");


function displaytour() {
    db.collection("tours").where("tourID", "==", id)
        .get()
        .then(doc => {
            console.log(doc)
            TourDocs = doc.docs;
            thisTour = TourDocs[0].data();
            console.log(thisTour);
            var tourtitle = thisTour.tourTitle;
            var tourcity = thisTour.city;
            var tour_description = thisTour.description;
            var tour_img = thisTour.tourImage;
            var tour_price = thisTour.tourActualPrice
            var tour_activity = thisTour.tourActivity
            var tourID = thisTour.tourID;
            document.getElementById('city_img_name').innerHTML = tourcity;
            document.getElementById('tour_title').innerHTML = tourtitle;
            document.getElementById('city').innerHTML = tourcity;
            document.getElementById('description').innerHTML = tour_description;
            document.getElementById('price').innerHTML = tour_price;
            document.getElementById('activity').innerHTML = tour_activity;
            document.getElementById('tour_img_').setAttribute("src", tour_img)
            document.getElementById('book_btn').onclick = () => savetour(tourID);
        })
}


displaytour()


function displayreview() {

    db.collection("Reviews").where("tourID", "==", id)
        .get()
        .then(doc => {
            console.log(doc)
            TourDocs = doc.docs;
            thisTour = TourDocs[0].data();
            console.log(thisTour);
            var reviewRating = thisTour.rating;
            var reviewFun = thisTour.fun;
            var reviewTitle = thisTour.title;
            var reviewExperience = thisTour.experience;
            var tourID = thisTour.tourID;



            document.getElementById('rating').innerHTML = reviewRating;
            document.getElementById('fun').innerHTML = reviewFun;
            document.getElementById('review_title').innerHTML = reviewTitle;
            document.getElementById('experience').innerHTML = reviewExperience;
        })
}


displayreview()


function savetour(tourID) {
    currentUser.set({
            booked: firebase.firestore.FieldValue.arrayUnion(tourID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("Tour has been saved");
            document.getElementById('book_btn').innerText = 'booked';
        });
}