function displayguide() {
    db.collection("Guides").doc("5fIBWAYO8ZfxcRuJhKRa").get()
        .then(guideDoc => {
            //get the data fields of the user
            var guidename = guideDoc.data().name;
            var guidebio = guideDoc.data().Bio;
            var guidecity = guideDoc.data().city;
            var guidelanguage = guideDoc.data().languages;
            var guideid = guideDoc.data().id;
            var tourtitle = guideDoc.data().title;
            document.getElementById('tour_title').innerHTML = tourtitle;
            document.getElementById('name').innerHTML = guidename;
            document.getElementById('city').innerHTML = guidecity;
            document.getElementById('bio').innerHTML = guidebio;
            document.getElementById('language').innerHTML = guidelanguage;


        })
}


displayguide()