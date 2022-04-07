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

    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
        location.href="login.html"
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var booked = userDoc.data().booked;
            console.log(booked);

            let CardTemplate = document.getElementById("CardTemplate");
            booked.forEach(thisTourID => {
                console.log(thisTourID);
                db.collection("tours").where("tourID", "==", thisTourID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var title = doc.tourTitle; //gets the name field
                        var tourID = doc.tourID; //gets the unique ID field
                        var tourCity = doc.city; //gets the length field
                        var tourDescription = doc.description;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title;
                        newCard.querySelector('.card-length').innerHTML = tourCity;
                        newCard.querySelector('.card-text').innerHTML = tourDescription;
                        newCard.querySelector('a').onclick = () => setTourData(tourID);
                        newCard.querySelector('.get_detail').href = "tour.html?title=" + title + "&id=" + tourID;
                        newCard.querySelector('img').src = doc.tourImage;
                        hikeCardGroup.appendChild(newCard);
                        document.getElementById('cancel_btn').onclick = () => cancelTour(tourID);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}

function setTourData(tourID){
    console.log(tourID)
    localStorage.setItem('tourID', tourID);
}

let BookID = localStorage.getItem("tourID")

function cancelTour(tourID) {
    currentUser.update({
            booked: firebase.firestore.FieldValue.arrayRemove(tourID)
    })
    .then(function () {
        console.log("Tour has been cancelled");
        // var iconID = 'save-' + hikeID;
        //console.log(iconID);
        document.getElementById('cancel_btn').innerText = 'Cancelled';
    });
}
// function saveBookmark(tourID) {
//     currentUser.set({
//             bookmarks: firebase.firestore.FieldValue.arrayUnion(tourID)
//         }, {
//             merge: true
//         })
//         .then(function () {
//             console.log("bookmark has been saved for: " + currentUser);
//             var iconID = 'save-' + tourID;
//             //console.log(iconID);
//             document.getElementById(iconID).innerText = 'bookmark';
//         });

// function setup() {
//     $('#review_btn').click(setTourID);
// }

// $(document).ready(setup);
