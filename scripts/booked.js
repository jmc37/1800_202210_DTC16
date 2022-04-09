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
        location.href = "login.html"
    }
});

//Get bookmarks from firestore
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
                        var title = doc.tourTitle;
                        var tourID = doc.tourID;
                        var tourCity = doc.city;
                        var tourDescription = doc.description;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title;
                        newCard.querySelector('.card-length').innerHTML = "City: " + tourCity;
                        newCard.querySelector('.card-text').innerHTML = "Description: " + tourDescription;
                        newCard.querySelector('a').onclick = () => setTourData(tourID);
                        newCard.querySelector('.get_detail').href = "tour.html?title=" + title + "&id=" + tourID;
                        newCard.querySelector('img').src = doc.tourImage;
                        newCard.querySelector('.cancel_btn').id = 'cancel-' + tourID;
                        newCard.querySelector('.cancel_btn').onclick = () => cancelTour(tourID);
                        tourCardGroup.appendChild(newCard);

                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}

//Delete booked tour from user's document in firestore
function cancelTour(tourID) {
    localStorage.setItem('tourID', tourID);
    currentUser.update({
            booked: firebase.firestore.FieldValue.arrayRemove(tourID)
        })
        .then(function () {
            document.getElementById('cancel-' + tourID).innerText = 'Cancelled';
            console.log("Tour has been cancelled");
        });
}