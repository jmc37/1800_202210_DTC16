function displayguide() {

    db.collection("Guides").where("city", "==", "Vancouver")
        .get()
        .then(doc => {

            guideDocs = doc.docs;
            thisGuide = guideDocs[0].data();
            console.log(thisGuide);
            var guidename = thisGuide.name;
            var guidebio = thisGuide.Bio;
            var guidecity = thisGuide.city;
            var guidelanguage = thisGuide.languages;
            var guideid = thisGuide.id;
            var guide_tourtitle = thisGuide.title;
            var tour_description = thisGuide.description;
            var tour_details = thisGuide.details;




            document.getElementById('name').innerHTML = guidename;
            document.getElementById('city').innerHTML = guidecity;
            document.getElementById('bio').innerHTML = guidebio;
            document.getElementById('language').innerHTML = guidelanguage;


        })
}


displayguide()