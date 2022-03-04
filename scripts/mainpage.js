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