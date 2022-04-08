function populateInfo() {
    console.log('works')
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


    var tourRef = db.collection("tours")
    tourRef.add({
        tourTitle: tourT,
        description: descript,
        tourImage: tourImg,
        city: city_value,
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