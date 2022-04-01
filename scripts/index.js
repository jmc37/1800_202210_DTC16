function populateCardsDynamically() {
    let hikeCardTemplate = document.getElementById("hikeCardTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("tours")
        .limit(10)
        .get()
        .then(allGuides => {
            allGuides.forEach(doc => {
                var title = doc.data().tourTitle; //gets the name field
                var tourID = doc.data().tourID; //gets the unique ID field
                var pictures = doc.data().tourImage;
                let testTourCard = TourCardTemplate.content.cloneNode(true);
                testTourCard.querySelector('.card-img').src = pictures;
                testTourCard.querySelector('.card-title').innerHTML = title;
                //NEW LINE: update to display length, duration, last updated
                testTourCard.querySelector('.card-length').innerHTML =
                    "City: " + doc.data().city + " <br>";
                    "Details: " + doc.data().description + " <br>";
                testTourCard.querySelector('.card-text').innerHTML =
                // testHikeCard.querySelector('.card-text').innerHTML = tourDescription;
                testTourCard.querySelector('.read-more').onclick = () => goToTour();
                // testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                // //next 2 lines are new for demo#11
                // //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                // //so later we know which hike to bookmark based on which hike was clicked
                testTourCard.querySelector('i').id = 'save-' + tourID;
                // // this line will call a function to save the hikes to the user's document             
                testTourCard.querySelector('i').onclick = () => saveBookmark(tourID);
                testTourCard.querySelector('.read-more').href = "saved.html?hikeName=" + title + "&id=" + tourID;
                TourCardGroup.appendChild(testTourCard);
            })

        })
}
populateCardsDynamically();



function setSearchBarCityName(){
    var searchkeyword = $('#search_bar').val()
    console.log(searchkeyword)
    localStorage.setItem ('searchkeyword', searchkeyword);
}


function setup() {
    $('.search_btn').click(setSearchBarCityName);
}

$(document).ready(setup);