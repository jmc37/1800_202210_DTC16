var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);
    } else {
        console.log("No user is signed in");
    }
});

function populateCardsDynamically() {
//Show popular tours in index page
    db.collection("tours")
        .limit(10)  //Show max 10 tours in index page.
        .get()
        .then(allGuides => {
            allGuides.forEach(doc => {
                var title = doc.data().tourTitle;
                var tourID = doc.data().tourID;
                var pictures = doc.data().tourImage;
                let testTourCard = TourCardTemplate.content.cloneNode(true);
                testTourCard.querySelector('.card-img').src = pictures;
                testTourCard.querySelector('.card-title').innerHTML = title;
                testTourCard.querySelector('.card-length').innerHTML =
                    "City: " + doc.data().city + " <br>" +
                    "Price: " + doc.data().tourActualPrice + " <br>" +
                    "Activity: " + doc.data().tourActivity + " <br>" +
                    "Language: " + doc.data().language + " <br>" +
                    "Details: " + doc.data().description + " <br>";
                testTourCard.querySelector('i').id = 'save-' + tourID;
                testTourCard.querySelector('i').onclick = () => saveBookmark(tourID);
                testTourCard.querySelector('.read-more').href = "/pages/tour.html?title=" + title + "&id=" + tourID;
                TourCardGroup.appendChild(testTourCard);
            })

        })
}
populateCardsDynamically();
//display tour cards in index page


//save bookmark in user document in firestore
function saveBookmark(tourID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(tourID)    //save bookmark in array
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + tourID;
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

//Store search keyword in local storage so that app can query firestore with it.
function setSearchBarCityName() {
    var searchkeyword = $('#search_bar').val()
    console.log(searchkeyword)
    localStorage.setItem('searchkeyword', searchkeyword);
}

//jQuery setup
function setup() {
    $('.search_btn').click(setSearchBarCityName);
}

$(document).ready(setup);