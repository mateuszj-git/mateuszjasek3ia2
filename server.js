//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;



//nasłuch na określonym porcie
app.use(express.static('static'))
var path = require("path")

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))

})
app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
})
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})
app.get("/admin", function (req, res) {
    if (log == 0) {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
    else if (log == 1) {
        res.sendFile(path.join(__dirname + "/static/admin1.html"))

    }
})

app.listen(PORT, function () {

    console.log("TO jest start serwera na porcie  " + PORT)
})

let tab = [{ id: '1', login: 'aaa', password: '123', age: '12', uczen: 'on', plec: 'm' },
{ id: '2', login: 'bbb', password: '123', age: '51', uczen: 'on', plec: 'k' },
{ id: '3', login: 'ccc', password: '123', age: '1', uczen: '', plec: 'm' },
]
let pom = 4;
let pom1 = true;

var bodyParser = require("body-parser");
const { table } = require("console");
const { get } = require("http");
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/register", function (req, res) {
    pom1 = true
    for (let i = 0; i < tab.length; i++) {
        if (req.body.login == tab[i].login) {
            pom1 = false;
            res.send("podany mail jest juz w bazie")

        }
    }
    if (pom1 == true) {
        let uzytkownik = { id: pom, login: req.body.login, password: req.body.password, age: req.body.age, uczen: req.body.uczen, plec: req.body.plec }
        tab.push(uzytkownik)
        pom++;
        console.log(tab)
        res.send("Witaj " + req.body.login + " jestes zarejestrowany")

    }




})

var log = 0
var pom3 = tab.length
app.post("/login", function (req, res) {
    log = 0
    for (let i = 0; i < tab.length; i++) {
        if (req.body.login == tab[i].login) {
            if (req.body.password == tab[i].password) {
                log = 1
            }
        }
    }
    if (log == 0) {
        res.send("Logowanie nie powiodlo sie, sprawdź poprawnosc danych logowania.")
    }
    else if (log == 1) {
        res.redirect("/admin")
    }
})
app.get("/logout", function (req, res) {
    res.redirect("/main")
    log = 0
})

app.get("/show", function (req, res) {
    if (log == 1) {
        var show = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        show = show + "<table>"
        for (var i = 0; i < tab.length; i++) {
            show = show + "<tr>"
            show = show + "<td style='color:white; border:1px solid yellow; width:20%;'>" + "id:" + tab[i].id + "</td>"
            show = show + "<td style='color:white; border:1px solid yellow; width:50%;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
            if (tab[i].uczen == "on") {
                show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "uczen:" + "<input type='checkbox'checked disabled>" + "</td > "
            }
            else {
                show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "uczen:" + "<input type='checkbox' disabled>" + "</td > "

            }
            show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "wiek:" + tab[i].age + "</td>"
            show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "płeć:" + tab[i].plec + "</td>"
            show = show + "</tr>"

        }
        show = show + "</table>"
        show = show + "</body>"

        res.send(show)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))

    }


})
app.post("/show", function (req, res) {
    if (log == 1) {
        var show = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        show = show + "<table>"
        for (var i = 0; i < tab.length; i++) {
            show = show + "<tr>"
            show = show + "<td style='color:white; border:1px solid yellow; width:20%;'>" + "id:" + tab[i].id + "</td>"
            show = show + "<td style='color:white; border:1px solid yellow; width:50%;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
            if (tab[i].uczen == "on") {
                show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "uczen:" + "<input type='checkbox'checked disabled>" + "</td > "
            }
            else {
                show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "uczen:" + "<input type='checkbox' disabled>" + "</td > "

            }
            show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "wiek:" + tab[i].age + "</td>"
            show = show + "<td style='color:white; border:1px solid yellow; width:10%;''>" + "płeć:" + tab[i].plec + "</td>"
            show = show + "</tr>"

        }
        show = show + "</table>"
        show = show + "</body>"

        res.send(show)
    }



})
app.get("/gender", function (req, res) {
    if (log == 1) {
        var gender = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        var pom1 = "<table>"
        var pom2 = "<table>"
        for (var i = 0; i < tab.length; i++) {

            if (tab[i].plec == "k") {
                pom1 = pom1 + "<tr>"
                pom1 = pom1 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "id:" + tab[i].id + "</td>"
                pom1 = pom1 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "płeć:" + tab[i].plec + "</td>"
                pom1 = pom1 + "</tr>"
            }

            else if (tab[i].plec == "m") {
                pom2 = pom2 + "<tr>"
                pom2 = pom2 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "id:" + tab[i].id + "</td>"
                pom2 = pom2 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "płeć:" + tab[i].plec + "</td>"
                pom2 = pom2 + "</tr>"

            }

        }
        pom1 = pom1 + "</table>" + "<br>"
        pom2 = pom2 + "</table>"
        gender = gender + pom1 + pom2
        res.send(gender)
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))

    }
})
app.post("/gender", function (req, res) {
    if (log == 1) {
        var gender = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        var pom1 = "<table>"
        var pom2 = "<table>"
        for (var i = 0; i < tab.length; i++) {

            if (tab[i].plec == "k") {
                pom1 = pom1 + "<tr>"
                pom1 = pom1 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "id:" + tab[i].id + "</td>"
                pom1 = pom1 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "płeć:" + tab[i].plec + "</td>"
                pom1 = pom1 + "</tr>"
            }

            else if (tab[i].plec == "m") {
                pom2 = pom2 + "<tr>"
                pom2 = pom2 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "id:" + tab[i].id + "</td>"
                pom2 = pom2 + "<td style='color:white; border:1px solid yellow; width:50vh;'>" + "płeć:" + tab[i].plec + "</td>"
                pom2 = pom2 + "</tr>"

            }

        }
        pom1 = pom1 + "</table>" + "<br>"
        pom2 = pom2 + "</table>"
        gender = gender + pom1 + pom2
        res.send(gender)
    }

})
var pom3 = "ros"
app.post("/sort", function (req, res) {
    if (log == 1) {
        var sort = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        if (req.body.ros == "mal") {
            pom3 = "mal"
        }
        else {
            pom3 = "ros"
        }

        if (pom3 == "ros") {
            sort = sort + '<form onchange="this.submit()" method="POST"><label style="color: white;" for="ros" >rosnąco</label><input checked="checked" class="rosnaca" type="radio" value="ros" name="ros"></input><label style="color: white;" for="mal">malejąco</label><input class="malejaca" type="radio" value="mal" name="ros"></input></form>'

            tab.sort(function (a, b) {
                return parseFloat(a.age) - parseFloat(b.age);
            });

            sort = sort + "<table>"
            for (var i = 0; i < tab.length; i++) {
                sort = sort + "<tr>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:30vh;'>" + "id:" + tab[i].id + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:50vh;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:20vh;''>" + "wiek:" + tab[i].age + "</td>"
                sort = sort + "</tr >"

            }
            sort = sort + "</table>"


        }
        else if (pom3 == "mal") {
            sort = sort + '<form onchange="this.submit()" method="POST"><label style="color: white;" for="ros" >rosnąco</label><input class="rosnaca" type="radio" value="ros" name="ros"></input><label style="color: white;" for="mal">malejąco</label><input checked="checked" class="malejaca" type="radio" value="mal" name="ros"></input></form>'

            tab.sort(function (a, b) {
                return parseFloat(b.age) - parseFloat(a.age);
            });

            sort = sort + "<table>"
            for (var i = 0; i < tab.length; i++) {
                sort = sort + "<tr>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:30vh;'>" + "id:" + tab[i].id + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:50vh;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:20vh;''>" + "wiek:" + tab[i].age + "</td>"
                sort = sort + "</tr >"

            }
            sort = sort + "</table>"
        }
        res.send(sort)
    }

    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))

    }

})


app.get("/sort", function (req, res) {
    if (log == 1) {
        var sort = '<body style="background-color:black;"> <div><form action="/sort" method="POST"><a style="float: left; margin-left:15px; color:white;"  href="#" onclick="this.parentNode.submit()">sort </a></form><form action="/gender" method="POST"><a style="float: left;color:white; margin-left:15px;"  href="#" onclick="this.parentNode.submit()">gender </a></form><form action="/show" method="POST"><a style="float: left;color:white; margin-left:15px;" href="#" onclick="this.parentNode.submit()">show </a></form></div></br></br></br>'
        if (req.body.ros == "mal") {
            pom3 = "mal"
        }
        else {
            pom3 = "ros"
        }

        if (pom3 == "ros") {
            sort = sort + '<form onchange="this.submit()" method="POST"><label style="color: white;" for="ros" >rosnąco</label><input checked="checked" class="rosnaca" type="radio" value="ros" name="ros"></input><label style="color: white;" for="mal">malejąco</label><input class="malejaca" type="radio" value="mal" name="ros"></input></form>'

            tab.sort(function (a, b) {
                return parseFloat(a.age) - parseFloat(b.age);
            });

            sort = sort + "<table>"
            for (var i = 0; i < tab.length; i++) {
                sort = sort + "<tr>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:30vh;'>" + "id:" + tab[i].id + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:50vh;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:20vh;''>" + "wiek:" + tab[i].age + "</td>"
                sort = sort + "</tr >"

            }
            sort = sort + "</table>"


        }
        else if (pom3 == "mal") {
            sort = sort + '<form onchange="this.submit()" method="POST"><label style="color: white;" for="ros" >rosnąco</label><input class="rosnaca" type="radio" value="ros" name="ros"></input><label style="color: white;" for="mal">malejąco</label><input checked="checked" class="malejaca" type="radio" value="mal" name="ros"></input></form>'

            tab.sort(function (a, b) {
                return parseFloat(b.age) - parseFloat(a.age);
            });

            sort = sort + "<table>"
            for (var i = 0; i < tab.length; i++) {
                sort = sort + "<tr>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:30vh;'>" + "id:" + tab[i].id + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:50vh;''>" + "user: " + tab[i].login + "-" + tab[i].password + "</td>"
                sort = sort + "<td style='color:white; border:1px solid yellow; width:20vh;''>" + "wiek:" + tab[i].age + "</td>"
                sort = sort + "</tr >"

            }
            sort = sort + "</table>"
        }
        res.send(sort)
    }

    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"))

    }

})
