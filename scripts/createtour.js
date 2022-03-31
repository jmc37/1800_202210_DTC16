var tourTitle = null
var description = null
var image = null


function populateInfo() {
    console.log('works')
    //go to the correct user document by referencing to the user uid
    tourT = $("#inputTour").val()
    descript = $("#description").val()
    tourImg = $("#tourImage").val()
    //define a variable for the collection you want to create in Firestore to populate data

    var tourRef = db.collection("tours")
    tourRef.add({
        tourTitle: tourT, //Title of tour
        description: descript, //Tour description
        tourImage: tourImg, //Url to picture of tour
        city: "Vancouver" //City added
    });
}

function setup() {
    $('#submit').click(populateInfo);
}

$(document).ready(setup);