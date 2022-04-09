var currentUser

//Display user's info
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {


            currentUser = db.collection("users").doc(user.uid)

            currentUser.get()
                .then(userDoc => {

                    var userName = userDoc.data().name;
                    var userAddress = userDoc.data().address;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userAddress;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                })
        } else {

            console.log("No user is signed in");
            location.href = "login.html"        //Redirect to login page if user is not signed in
        }
    });
}


populateInfo();

//Edit user's info
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

//Store or Update user info in firestore
function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userAddress = document.getElementById('addressInput').value;
    userEmail = document.getElementById('emailInput').value;
    userPhone = document.getElementById('phoneInput').value;

    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            currentUser = db.collection("users").doc(user.uid)

            currentUser.update({
                    name: userName,
                    address: userAddress,
                    email: userEmail,
                    phone_number: userPhone

                })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;  //Disable fields to prevent editting
                })
        }
    })
}

//customize the page with user name.
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name);

            })
        }

    })
}
insertName();