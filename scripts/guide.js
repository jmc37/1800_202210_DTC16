function displayguide() {

    //hardcoded for testing. replace it after indiv tourpage is done.
    // db.collection("Guides").doc("5fIBWAYO8ZfxcRuJhKRa").get()

    // db.collection("Guides").where("name", "==", __guideName or guideID _from_main_or_tourpage)
    db.collection("Guides").where("city", "==", "Vancouver")
    .get()
        .then(doc => {

            guideDocs = doc.docs;
            thisGuide = guideDocs[0].data();
            //get the data fields of only one guide who is result of query
            console.log(thisGuide);
            var guidename = thisGuide.name;
            var guidebio = thisGuide.Bio;
            var guidecity = thisGuide.city;
            var guidelanguage = thisGuide.languages;
            var guideid = thisGuide.id;
            var guide_tourtitle = thisGuide.title;
            var tour_description =thisGuide.description;
            var tour_details = thisGuide.details;


            
            // document.getElementById('tour_title').innerHTML = guide_tourtitle;
            document.getElementById('name').innerHTML = guidename;
            document.getElementById('city').innerHTML = guidecity;
            document.getElementById('bio').innerHTML = guidebio;
            document.getElementById('language').innerHTML = guidelanguage;
            // document.getElementById('description').innerHTML = tour_description;
            
            // document.getElementById('detail').innerHTML = tour_details;
            

        })
}


displayguide()


// function writeGuides() {
    //define a variable for the collection you want to create in Firestore to populate data
    // var GuideRef = db.collection("Guides");
    // GuideRef.get().then(doc => {
    //     x = doc.docs
    //     y = x[0].data();
    // console.log(y)
    // })

//     GuideRef.doc("5fIBWAYO8ZfxcRuJhKRa").set({
//         name: "Kyle G.",
//         city: "Vancouver",
//         description: "the city that Jesper loved..",
//         id: "0001",
//         title: "Amazing Vancouver Tour",
//         languages: "Tagalog",
//         Bio: "lorem lorem",
//         details:
//         "Day 1: Meeting at YVR airport, visit Stanley park. \
//         lorem ipsum lorem ipsum lorem ipsum \
//         Day 2: Visit Granville Island \
//         lorem ipsum lorem ipsum\
//         Day 3: Hiking to Joffre Lake"}),

        
//         {merge: true};

      
 
// };
// writeGuides()
// // citiesRef.doc("SF").set({
//    state: "CA"}, 
//  name: "San Francisco", state: "C1A", country: "USA",
//  capital: false, population: 860000,
//  regions: ["west_coast", "norcal"]},
// {merge: true});