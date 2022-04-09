var tourID = localStorage.getItem("tourID");   //Get data from local storage
db.collection("tours").where("tourTitle", "==", tourID)    //Get tour data using tour ID that is stored in local storage
    .get()
    .then(queryGuide => {
        size = queryGuide.size;
        Tours = queryGuide.docs;
        if (size == 1) {
            var thisTour = tours[0].data();
            name = thisTour.tourTitle;
            document.getElementById("name").innerHTML = name;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

//Create a review in Reviews collection in Firestore using tourID
function writeReview() {
    let Title = document.getElementById("title").value;
    let experience = document.getElementById("description").value;
    let improvement = document.getElementById("improvement").value;
    let fun = document.querySelector('input[name="fun"]:checked').value;
    let rating = document.querySelector('input[name="rating"]:checked').value;
    console.log(Title, experience, improvement, fun, rating);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Reviews").add({
                        tourID: tourID,
                        userID: userID,
                        title: Title,
                        experience: experience,
                        improvement: improvement,
                        fun: fun,
                        rating: rating,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert('Thanks! your review has submitted');   //Alert to user that review has submitted
                    })
                })
        } else {

        }
    });

}