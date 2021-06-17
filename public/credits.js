var credits = [
    {
        credit: "Litmus"
    },
    {
        credit: "an intimate, interactive experience"
    },
    {
        credit: "created by Koryn Wicks & Willing Kompany"
    },
    {
        credit: "choreography by Koryn Wicks"
    },
    {
        credit: "music by Hanah Davenport"
    },
    {
        credit: "recording and sound engineering by Alex Lough"
    },
    {
        credit: "interactive sound design by Alex Lough"
    },
    {
        credit: "text by Sam Alper"
    },
    {
        credit: "interactive lighting design by Morgan Embry"
    },
    {
        credit: "interactive design by Koryn Wicks"
    },
    {
        credit: "web platform by Matthew Guyotte"
    },
    {
        credit: "Produced in association with Night Light Studios"
    },
    {
        credit: "Special thanks to Mike Ohsann & PJ Carruth"
    },
    {
        credit: "performed by Morgan Embry and Koryn Wicks"
    },   
];

var creditsContainer = document.getElementById('user-input-credits')

function creditFill() {
    for(var i = 0; i < credits.length; i++) {
        var new_h3 = document.createElement("h3");
        new_h3.className = "credit";
        new_h3.innerHTML = credits[i].credit;
        creditsContainer.appendChild(new_h3);
    }
}