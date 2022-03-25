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
            var guide_tourtitle = thisGuide.tourtitle;


            
            document.getElementById('tour_title').innerHTML = guide_tourtitle;
            document.getElementById('name').innerHTML = guidename;
            document.getElementById('city').innerHTML = guidecity;
            document.getElementById('bio').innerHTML = guidebio;
            document.getElementById('language').innerHTML = guidelanguage;


        })
}


displayguide()