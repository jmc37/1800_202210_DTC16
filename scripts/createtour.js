var tourTitle = null
var description = null
var image = null


function populateInfo() {
            //go to the correct user document by referencing to the user uid
            tourTitle = $("#inputTour").val()
            //define a variable for the collection you want to create in Firestore to populate data
            var tourRef = db.collection("tours");

            tourRef.add({
                tourTitle: tourTitle,
                name: "Burnaby Lake Park Trail", //replace with your own city?
                city: "Burnaby",
            });
       
        console.log(userName)
}
            // currentUser = db.collection("tours").doc(user.uid).add
function setup(){
$('#submit').click(populateInfo)

jQuery(document).ready(setup)