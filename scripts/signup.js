var currentUser

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

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}
editUserInfo();

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
                    window.location.assign("../index.html");
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;

                })
        }
    })
}