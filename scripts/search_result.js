var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);

    } else {
        console.log("No user is signed in");
    }
});

//Get search keyword from local storage
var searchkeyword = localStorage.getItem("searchkeyword");

//Display search result
function populateCardsDynamically() {
    db.collection("tours").where("city", "==", searchkeyword)
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


//save bookmark in user document in firestore
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

//Store Search keyworld in local storage to query through firestore as well as pass it to other pages
function setSearchBarCityName() {
    var searchkeyword = $('#search_bar').val()
    console.log(searchkeyword)
    localStorage.setItem('searchkeyword', searchkeyword);
}


//Store filter criteria in local storage to pass it to other pages
function setSearchFilter() {
    var searchfilter = $(this).attr("id")
    console.log(searchfilter)
    localStorage.setItem('searchfilter', searchfilter);
}


//jQuery setup
function setup() {
    $('.search_btn').click(setSearchBarCityName);
    $('.filter_btn').click(setSearchFilter);
}

$(document).ready(setup);