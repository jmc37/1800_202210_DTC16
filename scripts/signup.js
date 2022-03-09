var currentUser //put this right after you start script tag before writing any functions.

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
                    var userRole = userDoc.data().role;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userRole != null) {
                        document.getElementById("roleInput").value = userRole;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}
// editUserInfo();

function saveUserInfo() {
    //Enable the form fields

    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userCity = document.getElementById('cityInput').value; //get the value of the field with id="schoolInput"
    userRole = document.getElementById('roleInput').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            // Write update database
            currentUser.update({
                    name: userName,
                    city: userCity,
                    Role: userRole
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;

                })
        }
    })
}
// saveUserInfo();`