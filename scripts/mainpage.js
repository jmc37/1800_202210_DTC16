function writeGuides() {
    //define a variable for the collection you want to create in Firestore to populate data
    var GuideRef = db.collection("Guides");

    GuideRef.add({
        name: "Kyle G.",   
        city: "Burnaby,BC",
        languages:"Tagalog,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"

    });
    GuideRef.add({
        name: "Sanghoon L.",   
        city: "Vancouver,BC",
        languages:"Korean,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"
    });
    GuideRef.add({
        name: "Luca H.",   
        city: "Whistler,BC",
        languages:"Vietnamese,English",
        Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget maximus magna, vel dictum purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"
    });
};

function displayCards(collection) {
    let cardTemplate = document.getElementById("guideCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                var guideID = doc.data().id; //gets the unique ID field
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${guideID}.jpg`; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}
displayCards("Guides");