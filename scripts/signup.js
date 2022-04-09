var currentUser

// Populate page with user's info based on user data in firestore
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {


            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {

                    var userName = userDoc.data().name;
                    var userCity = userDoc.data().city;
                    var tourGuide = userDoc.data().role;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userRole != null) {
                        document.getElementById("tour_or_user").value = tourGuide;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}
populateInfo()

//Allow user to edit user info
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false; //activate field to edit
}
editUserInfo();

//Update user info in user collection in firestore
function submitUserInfo() {
    userName = document.getElementById('nameInput').value;
    userCity = document.getElementById('cityInput').value;
    tourGuide = document.getElementById('tour_or_user').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                    name: userName,
                    city: userCity,
                    Guide: tourGuide
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("../index.html");    //Redirect to index after store user info
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;

                })
        }
    })
}