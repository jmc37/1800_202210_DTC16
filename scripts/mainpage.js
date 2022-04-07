var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});


function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("tours")
        .limit(10)
        .get()
        .then(allGuides => {
            allGuides.forEach(doc => {
                var title = doc.data().tourTitle; //gets the name field
                var tourID = doc.data().tourID; //gets the unique ID field
                var pictures = doc.data().tourImage;
                let testTourCard = TourCardTemplate.content.cloneNode(true);
                testTourCard.querySelector('.card-img').src = pictures;
                testTourCard.querySelector('.card-title').innerHTML = title;
                //NEW LINE: update to display length, duration, last updated
                testTourCard.querySelector('.card-length').innerHTML =
                    "City: " + doc.data().city + " <br>" +
                    "Details: " + doc.data().description + " <br>";
                testTourCard.querySelector('.card-text').innerHTML =
                // testHikeCard.querySelector('.card-text').innerHTML = tourDescription;
                testTourCard.querySelector('.read-more').onclick = () => goToTour();
                // testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                // //next 2 lines are new for demo#11
                // //this line sets the id attribute for the <i> tag in the format of "save-tourID" 
                // //so later we know which hike to bookmark based on which hike was clicked
                testTourCard.querySelector('i').id = 'save-' + tourID;
                // // this line will call a function to save the hikes to the user's document             
                testTourCard.querySelector('i').onclick = () => saveBookmark(tourID);
                testTourCard.querySelector('.read-more').href = "tour.html?title=" + title + "&id=" + tourID;
                TourCardGroup.appendChild(testTourCard);
            })

        })
}
populateCardsDynamically();
//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function goToTour() {
    window.location.href = "tour.html"
}

function saveBookmark(tourID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(tourID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + tourID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

function setHikeData(id) {
    localStorage.setItem('tourID', id);
}