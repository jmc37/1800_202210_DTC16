function populateInfo() {
    console.log('works')
    //go to the correct user document by referencing to the user uid
    tourT = $("#inputTour").val()
    descript = $("#description").val()
    tourImg = $("#tourImage").val()
    spoken_language = $("#spoken_language").val()
    city_value = $('#city_name option:selected').val()
    tourNickname = $("#tour_nickname").val()
    activity = $('#activity_name option:selected').val()
    price = $('#tour_price option:selected').val()
    actual_price = $('#tour_price option:selected').text()
    console.log(city_value)

    alert("submitted!")
    //define a variable for the collection you want to create in Firestore to populate data

    var tourRef = db.collection("tours")
    tourRef.add({
        tourTitle: tourT, //Title of tour
        description: descript, //Tour description
        tourImage: tourImg, //Url to picture of tour
        city: city_value, //City added
        language: spoken_language,
        tourID: city_value + tourNickname,
        tourActivity: activity,
        tourPrice: price,
        tourActualPrice: actual_price
    });
}






function setup() {
    $('#submit').click(populateInfo);

}

$(document).ready(setup);