var currentUser //put this right after you start script tag before writing any functions.

alert("Take care Hoda! Get well soon...!" )

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userCity = userDoc.data().city;
                    var tourGuide = userDoc.data().role;

                    //if the data fields are not empty, then write them in to the form.
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
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateInfo()

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}
editUserInfo();

function submitUserInfo() {
    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userCity = document.getElementById('cityInput').value; //get the value of the field with id="schoolInput"
    tourGuide = document.getElementById('tour_or_user').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            // Write update database
            currentUser.update({
                    name: userName,
                    city: userCity,
                    Guide: tourGuide
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("mainpage.html");})
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;

                })
        }
    })
}
