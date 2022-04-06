function showDetails() {
    // create a URL object
    let params = new URL(window.location.href);
    let id = params.searchParams.get("tourID"); //parse "id"
    let tourName = params.searchParams.get("tourTitle"); //parse "collection"

    let message = "Tour Name is: " + tourName; //build message to display
    message += " &nbsp | Document id is:  " + id;
    // document.getElementById("tourName").innerHTML = tourName;
    // document.getElementById("details-go-here").innerHTML = message;
}
showDetails();

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
                var bookmarks = userDoc.data().bookmarks;
                console.log(bookmarks);

                let CardTemplate = document.getElementById("CardTemplate");
                bookmarks.forEach(thisTourID => {
                        console.log(thisTourID);
                        db.collection("tours").where("tourID", "==", thisTourID).get().then(snap => {
                            size = snap.size;
                            queryData = snap.docs;


                            if (size == 1) {
                                var doc = queryData[0].data();
                                var tourName = doc.tourTitle;
                                var tourCity = doc.city
                                var pictures = doc.tourImage;
                                var ID = doc.tourID;
                                let newCard = CardTemplate.content.cloneNode(true);
                                newCard.querySelector('.card-title').innerHTML = tourName
                                newCard.querySelector('.card-length').innerHTML = tourCity
                                newCard.querySelector('a').onclick = () => setHikeData(ID);
                                newCard.querySelector('img').src = pictures;
                                tourCardGroup.appendChild(newCard)

                            } else {
                                    console.log("Query has more than one data")
                            }
                            
                        })
                    });
        })
            
}           