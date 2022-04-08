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


function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("tours").where("city", "==", searchkeyword)
        .limit(10)
        .get()
        .then(allGuides => {
            allGuides.forEach(doc => {
                var title = doc.data().tourTitle;
                var tourID = doc.data().tourID;
                var pictures = doc.data().tourImage;
                var price = doc.data().tourActualPrice;
                var language = doc.data().language;
                var activity = doc.data().tourActivity;
                let testTourCard = TourCardTemplate.content.cloneNode(true);
                testTourCard.querySelector('.card-img').src = pictures;
                testTourCard.querySelector('.card-title').innerHTML = title;
                testTourCard.querySelector('.card-length').innerHTML = "City: " + doc.data().city + " <br>";
                testTourCard.querySelector('.card-text').innerHTML = "Description: " + doc.data().description + " <br>";
                testTourCard.querySelector('.tour_price').src = price;
                testTourCard.querySelector('.language').innerHTML = language;
                testTourCard.querySelector('.activity').innerHTML = activity;
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

function setSearchBarCityName() {
    var searchkeyword = $('#search_bar').val()
    console.log(searchkeyword)
    localStorage.setItem('searchkeyword', searchkeyword);
}


function setup() {
    $('.search_btn').click(setSearchBarCityName);
}

$(document).ready(setup);

function setSearchFilter() {
    var searchfilter = $(this).attr("id")
    console.log(searchfilter)
    localStorage.setItem('searchfilter', searchfilter);
}


function setup() {
    $('.filter_btn').click(setSearchFilter);
}

$(document).ready(setup);