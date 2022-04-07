// var tourTitle = null
// var description = null
// var image = null
// var city_value = null


function populateInfo() {
    console.log('works')
    //go to the correct user document by referencing to the user uid
    tourT = $("#inputTour").val()
    descript = $("#description").val()
    tourImg = $("#tourImage").val()
    city_value = $('#city_name option:selected').val()
    tourNickname = $("#tour_nickname").val()
    activity = $('#activity_name option:selected').val()
    price = $('#tour_price option:selected').val()
    console.log(city_value)

    alert("submitted!")
    //define a variable for the collection you want to create in Firestore to populate data

    var tourRef = db.collection("tours")
    tourRef.add({
        tourTitle: tourT, //Title of tour
        description: descript, //Tour description
        tourImage: tourImg, //Url to picture of tour
        city: city_value, //City added
        tourID: city_value + tourNickname,
        tourActivity: activity,
        tourPrice: price
    });
}






function setup() {
    $('#submit').click(populateInfo);

}

$(document).ready(setup);