let guideID = localStorage.getItem("tourID");

db.collection("Guides").where("id", "==", tourID)
            .get()
            .then(queryGuide => {
                //see how many results you have got from the query
                size = queryGuide.size;
                // get the documents of query
                Guides = queryGuide.docs;

                // We want to have one document per hike, so if the the result of 
                //the query is more than one, we can check it right now and clean the DB if needed.
                if (size == 1) {
                    var thisGuide = Guides[0].data();
                    name = thisGuide.name;
                    document.getElementById("name").innerHTML = name;
                } else {
                    console.log("Query has more than one data")
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


            function writeReview() {
                console.log("in")
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
                        //get the document for current user.
                        currentUser.get()
                            .then(userDoc => {
                                var userEmail = userDoc.data().email;
                                db.collection("Reviews").add({
                                    code: id,
                                    userID: userID,
                                    title: Title,
                                    experience: experience,
                                    improvement: improvement,
                                    fun: fun,
                                    rating: rating,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                }).then(()=>{
                                    window.location.href = "thanks.html"; //new line added
                                })
                            })
                               
                    } else {
                        // No user is signed in.
                    }
                });
            
            }