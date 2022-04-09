 // Show tour details.
function showDetails() {
    let params = new URL(window.location.href);
    let id = params.searchParams.get("tourID");          //Get data from URL
    let tourName = params.searchParams.get("tourTitle");  //Get data from URL

    let message = "Tour Name is: " + tourName;
    message += " &nbsp | Document id is:  " + id;
}
showDetails();


//Authentication
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
        location.href = "login.html"
    }
});

//Get bookmark data from Firestore using tourID
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisTourID => {
                console.log(thisTourID);
                db.collection("tours").where("tourID", "==", thisTourID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;


                    if (size == 1) {     //display bookmarked tour details if there is only 1 query result
                        var doc = queryData[0].data();
                        var title = doc.tourTitle;
                        var pictures = doc.tourImage;
                        var tourID = doc.tourID;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title
                        newCard.querySelector('.card-length').innerHTML =
                            "City: " + doc.city + " <br>" +
                            "Price: " + doc.tourActualPrice + " <br>" +
                            "Activity: " + doc.tourActivity + " <br>" +
                            "Language: " + doc.language + " <br>" +
                            "Details: " + doc.description + " <br>";
                        newCard.querySelector('img').src = pictures;
                        newCard.querySelector('a').onclick = () => setTourData(tourID);
                        newCard.querySelector('.read-more').href = "tour.html?title=" + title + "&id=" + tourID;
                        tourCardGroup.appendChild(newCard)

                    } else {
                        console.log("Query has more than one data")   //There is 2 or more query results
                    }

                })
            });
        })

}

// Store tourID in localstorage
function setTourData(tourID) {
    console.log(tourID)
    localStorage.setItem('tourID', tourID);
}

let BookID = localStorage.getItem("tourID")
