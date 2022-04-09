var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);

    } else {
        console.log("No user is signed in");
    }
});


var searchkeyword = localStorage.getItem("searchkeyword");
var searchfilter = localStorage.getItem("searchfilter");


function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("tours").where("city", "==", searchkeyword).where("tourPrice", "==", searchfilter)
        .limit(10)
        .get()
        .then(allGuides => {
            allGuides.forEach(doc => {
                var title = doc.data().tourTitle;
                var tourID = doc.data().tourID;
                var pictures = doc.data().tourImage;
                var city = doc.data().city
                var price = doc.data().tourActualPrice;
                var language = doc.data().language;
                var activity = doc.data().tourActivity;
                var description = doc.data().description
                let testTourCard = TourCardTemplate.content.cloneNode(true);
                testTourCard.querySelector('.card-img').src = pictures;
                testTourCard.querySelector('.card-title').innerHTML = title;
                testTourCard.querySelector('.card-length').innerHTML =
                    "City: " + city + " <br>" +
                    "Price: " + price + " <br>" +
                    "Activity: " + activity + " <br>" +
                    "Language: " + language + " <br>" +
                    "Details: " + description + " <br>";
                testTourCard.querySelector('i').id = 'save-' + tourID;
                testTourCard.querySelector('i').onclick = () => saveBookmark(tourID);
                testTourCard.querySelector('.read-more').href = "tour.html?title=" + title + "&id=" + tourID;
                TourCardGroup.appendChild(testTourCard);
            })

        })
}

populateCardsDynamically();

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
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

function setHikeData(id) {
    localStorage.setItem('tourID', id);
}


function setSearchFilter() {
    var searchfilter = $(this).attr("id")
    console.log(searchfilter)
    localStorage.setItem('searchfilter', searchfilter);
}


function setup() {
    $('.filter_btn').click(setSearchFilter);
}

$(document).ready(setup);