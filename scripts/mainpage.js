function writeGuides() {
    //define a variable for the collection you want to create in Firestore to populate data
    var GuideRef = db.collection("Tour");

    GuideRef.add({
        name: "Kyle G.",   
        city: "Burnaby,BC",
        languages:"Tagalog,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"

    });
    GuideRef.add({
        name: "Sanghoon L.",   
        city: "Vancouver,BC",
        languages:"Korean,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"
    });
    GuideRef.add({
        name: "Luca H.",   
        city: "Whistler,BC",
        languages:"Vietnamese,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"
    });
};

function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("Tour")
    // .orderBy("length_time")            //NEW LINE;  what do you want to sort by?
    .limit(3)
    .get()
        .then(allHikes => {
            allHikes.forEach(doc => {
                var hikeName = doc.data().name; //gets the name field
                var hikeID = doc.data().id; //gets the unique ID field
                var hikeLength = doc.data().length; //gets the length field
                let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                testHikeCard.querySelector('.card-title').innerHTML = hikeName;
                // testHikeCard.querySelector('.card-length').innerHTML = hikeLength;
                //NEW LINE: update to display length, duration, last updated
                testHikeCard.querySelector('.card-length').innerHTML = 
                "Length: " + doc.data().length + " km <br>" +
                "Duration: " + doc.data().length_time + "min <br>" +
                "Last updated: " + doc.data().last_updated.toDate(); 
                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
                testHikeCard.querySelector('i').id = 'save-' + hikeID;
                // this line will call a function to save the hikes to the user's document             
                testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);
                testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
                hikeCardGroup.appendChild(testHikeCard);
            })

        })
}
// populateCardsDynamically();
//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveBookmark(hikeID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + hikeID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}
function setHikeData(id) {
    localStorage.setItem('hikeID', id);
}