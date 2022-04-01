firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
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
                        var tourName = doc.tourTitle; //gets the name field
                        var tourID = doc.tourID; //gets the unique ID field
                        var tourCity = doc.city; //gets the length field
                        var tourDescription = doc.description;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = tourName;
                        newCard.querySelector('.card-length').innerHTML = tourCity;
                        newCard.querySelector('.card-text').innerHTML = tourDescription;
                        newCard.querySelector('a').onclick = () => setHikeData(hikeID);
                        newCard.querySelector('img').src = doc.tourImage;
                        hikeCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}