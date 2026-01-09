function validateFrontPage() {
    let fields = ["name","age","location","phone","email","strand"];
    for (let id of fields) {
        if (!document.getElementById(id).value.trim()) {
            alert("Please fill out all fields.");
            return;
        }
    }

    if (!document.getElementById("agree").checked) {
        alert("You must agree to the Terms of Use.");
        return;
    }

    document.getElementById("frontPage").style.display = "none";
    document.getElementById("questionsPage").style.display = "block";
    loadQuestion();
}


document.getElementById("openTerms").onclick = () =>
    document.getElementById("termsModal").style.display = "block";

document.getElementById("closeModal").onclick = () =>
    document.getElementById("termsModal").style.display = "none";


const questions = [
    { text: "Do you enjoy working with computers or coding?", cat: "tech" },
    { text: "Do you like designing or building machines?", cat: "engineering" },
    { text: "Are you interested in healthcare or medicine?", cat: "health" },
    { text: "Do you enjoy teaching others?", cat: "education" },
    { text: "Do you enjoy arts and creative design?", cat: "arts" },
    { text: "Are you interested in business or finance?", cat: "business" },
    { text: "Do you enjoy scientific research?", cat: "science" },
    { text: "Are you interested in cooking or hospitality?", cat: "cookery" },
    { text: "Do you like studying people or society?", cat: "social" },
    { text: "Are you interested in agriculture or environment?", cat: "agri" }
];

let scores = {};
questions.forEach(q => scores[q.cat] = 0);

let currentQuestion = 0;


function loadQuestion() {
    document.getElementById("qText").innerText = questions[currentQuestion].text;
    updateProgress();
}
R
function updateProgress() {
    document.getElementById("progress").style.width =
        (currentQuestion / questions.length) * 100 + "%";
}


function nextQuestion() {
    let selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    scores[questions[currentQuestion].cat] += parseInt(selected.value);
    selected.checked = false;
    currentQuestion++;

    currentQuestion >= questions.length ? showResults() : loadQuestion();
}


function showResults() {
    document.getElementById("questionsPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    let bestCat = Object.keys(scores).reduce((a,b) => scores[a] > scores[b] ? a : b);
    let courseResult = document.getElementById("courseResult");
    let schoolList = document.getElementById("schoolList");
    schoolList.innerHTML = "";

    let data = {
        tech: {
            course: "BSIT, BSCS, Computer Engineering",
            schools: [
            { name: "Mapúa University", url: "https://www.mapua.edu.ph" },
            { name: "FEU Tech", url: "https://www.feutech.edu.ph" },
            { name: "iACADEMY", url: "https://www.iacademy.edu.ph" },
            { name: "CIIT College of Arts and Technology", url: "https://www.ciit.edu.ph" },
            { name: "UP Diliman", url: "https://upd.edu.ph" }
            ]
        },
        engineering: {
            course: "Civil, Electrical, Mechanical Engineering",
            schools: [
            { name: "Mapúa University", url: "https://www.mapua.edu.ph" },
            { name: "UP Diliman", url: "https://upd.edu.ph" },
            { name: "FEU Tech", url: "https://www.feutech.edu.ph" },
            { name: "Adamson University", url: "https://www.adamson.edu.ph" }
            ]
        },
        health: {
            course: "Nursing, Medical Technology",
            schools: [
            { name: "University of Santo Tomas", url: "https://www.ust.edu.ph" },
            { name: "Centro Escolar University", url: "https://www.ceu.edu.ph" },
            { name: "University of the East", url: "https://www.ue.edu.ph" },
            { name: "FEU-NRMF", url: "https://www.feu-nrmf.ph" }
            ]
        },
        education: {
            course: "BSEd, BEEd",
            schools: [
            { name: "Philippine Normal University", url: "https://www.pnu.edu.ph" },
            { name: "FEU", url: "https://www.feu.edu.ph" },
            { name: "National University", url: "https://www.national-u.edu.ph" }
        
            ]
        },
        arts: {
            course: "Multimedia Arts, Animation",
            schools: [
                { name: "DLSU-CSB", url: "https://www.benilde.edu.ph" },
            { name: "UP Diliman", url: "https://upd.edu.ph" },
            { name: "iACADEMY", url: "https://www.iacademy.edu.ph" },
            { name: "CIIT", url: "https://www.ciit.edu.ph" }
        
            ]
        },
        business: {
            course: "Business Administration, Accountancy",
            schools: [
            { name: "De La Salle University", url: "https://www.dlsu.edu.ph" },
            { name: "University of the East", url: "https://www.ue.edu.ph" },
            { name: "Polytechnic University of the Philippines", url: "https://www.pup.edu.ph" },
            { name: "San Beda University", url: "https://www.sanbeda.edu.ph" }

            ]
        },
        science: {
            course: "Biology, Chemistry, Physics",
            schools: [
            { name: "UP Diliman", url: "https://upd.edu.ph" },
            { name: "University of Santo Tomas", url: "https://www.ust.edu.ph" },
            { name: "MSU-IIT", url: "https://www.msuiit.edu.ph" }

            ]
        },
        cookery: {
            course: "Culinary Arts, HRM",
            schools: [
            { name: "Lyceum of the Philippines University", url: "https://manila.lpu.edu.ph" },
            { name: "Treston International College", url: "https://treston.edu.ph" },
            { name: "Araullo University", url: "https://www.aupen.edu.ph" },
            { name: "Philippine Women's University", url: "https://www.pwu.edu.ph" }

            ]
        },
        social: {
            course: "Psychology, Sociology",
            schools: [
            { name: "UP Diliman", url: "https://upd.edu.ph" },
            { name: "Polytechnic University of the Philippines", url: "https://www.pup.edu.ph" },
            { name: "University of the East", url: "https://www.ue.edu.ph" }
            ]
        },
        agri: {
            course: "Agriculture, Forestry",
            schools: [
                { name: "UP Los Baños", url: "https://uplb.edu.ph" },
            { name: "Central Luzon State University", url: "https://www.clsu.edu.ph" },
            { name: "Benguet State University", url: "https://www.bsu.edu.ph" }
            ]
        }
    };

    courseResult.innerText = "Recommended Courses: " + data[bestCat].course;

    data[bestCat].schools.forEach(s => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = s.url;
        a.innerText = s.name;
        a.target = "_blank";
        li.appendChild(a);
        schoolList.appendChild(li);
    });
}
