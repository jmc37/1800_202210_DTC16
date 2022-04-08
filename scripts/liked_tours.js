function showDetails() {
    let params = new URL(window.location.href);
    let id = params.searchParams.get("tourID");
    let tourName = params.searchParams.get("tourTitle");

    let message = "Tour Name is: " + tourName;
    message += " &nbsp | Document id is:  " + id;
}
showDetails();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
        location.href = "login.html"
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
                        var title = doc.tourTitle;
                        var tourCity = doc.city
                        var pictures = doc.tourImage;
                        var tourID = doc.tourID;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = title
                        newCard.querySelector('.card-length').innerHTML = tourCity
                        // newCard.querySelector('a').onclick = () => setHikeData(ID);
                        newCard.querySelector('img').src = pictures;
                        newCard.querySelector('.read-more').href = "tour.html?title=" + title + "&id=" + tourID;
                        tourCardGroup.appendChild(newCard)
                        
                    } else {
                        console.log("Query has more than one data")
                    }

                })
            });
        })

}