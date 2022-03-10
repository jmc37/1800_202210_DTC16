var currentUser

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
                    var userAddress = userDoc.data().address;
                    var userEmail = userDoc.data().city;
                    var userPhone = userDoc.data().phone

                    //if the data fields are not empty, then write them in to the form.
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
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userAddress = document.getElementById('addressInput').value;     //get the value of the field with id="addressInput"
    userEmail = document.getElementById('emailInput').value;       //get the value of the field with id="emailInput"
    userPhone = document.getElementById('phoneInput').value;       //get the value of the field with id="phoneInput"

    firebase.auth().onAuthStateChanged(user =>{
        
        if (user){
            currentUser = db.collection("users").doc(user.uid)

            currentUser.update({
            name: userName,
            address: userAddress,
            email: userEmail,
            phone_number: userPhone
            
            })
            .then(() => {
            console.log("Document successfully updated!");
            document.getElementById('personalInfoFields').disabled = true;
            })
        }
    })
}

function insertName(){
    // to check if the user is logged in:
     firebase.auth().onAuthStateChanged(user =>{
         if (user){
             console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_Name= userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })    
        }
    
     })
    }
    insertName();
