let szam = document.getElementById("szam")
let err = document.getElementById("err")
let pb = document.getElementById("pb")
let tim = document.getElementById("time")
let endTime = document.getElementById("endTime")
let egyediSZ = document.getElementById("egyediSZ")

let ell = document.getElementById("ell")
let gray = document.getElementById("gray")


let muvJel = []

let min = 0
let sec = 0
let time = false
let end = false

let loader = document.querySelector(".preloader");

window.addEventListener("load", vanish)

function vanish() {
  setTimeout(()=>{loader.classList.add("disppear")},300)
}

function Check() {
    if (end) return;
    let goods = []

    for (let i = 1; i < 11; i++) {
        let a = document.getElementById(`a${i}`)
        let b = document.getElementById(`b${i}`)
        let inp = document.getElementById(`inp${i}`)
        let res = document.getElementById(`res${i}`)
        let jel = document.getElementById(`jel${i}`) 
        let muvelet = jel.innerHTML

        if (muvelet == "-") {
            if (parseInt(inp.value) == parseInt(a.innerHTML) - parseInt(b.innerHTML)) {
                res.innerHTML = "✅"
            } else {
                res.innerHTML = "❌"
            }
        } else if (muvelet == "+") {
            if (parseInt(inp.value) == parseInt(a.innerHTML) + parseInt(b.innerHTML)) {
                res.innerHTML = "✅"
            } else {
                res.innerHTML = "❌"
            }
        } else if (muvelet == "*") {
            if (parseInt(inp.value) == parseInt(a.innerHTML) * parseInt(b.innerHTML)) {
                res.innerHTML = "✅"
            } else {
                res.innerHTML = "❌"
            }
        } else if (muvelet == "/") {
            if (parseInt(inp.value) == parseInt(a.innerHTML) / parseInt(b.innerHTML)) {
                res.innerHTML = "✅"
            } else {
                res.innerHTML = "❌"
            }
        }

    }

    for (let i = 1; i < 11; i++) {
        let res = document.getElementById(`res${i}`)
        if (res.innerHTML == "✅") {
            goods.push(i)
        }
    }

    let res = document.getElementById("res")

    if (goods.length == 10) {
        res.innerHTML = "✅"
        time = false
        end = true
        endTime.innerHTML = tim.innerHTML
        ell.style.display = "none"
        gray.style.display = "block"
    } else {
        res.innerHTML = "❌"
    }

    goods = []
}

function Start() {
    for (let i = 1; i < 5; i++) {
        let now = document.getElementById(`m${i}`)
        if (now.checked) muvJel.push(now.value)
    }

    if (szam.value == "def" && muvJel.length == 0) {
        err.innerHTML = "Nincs megadva a művelet és a számkészlet"
        err.style.display = "block"

        return;
    } else if (szam.value == "def") {
        err.innerHTML = "Nincs megadva a számkészlet"
        err.style.display = "block"

        return;
    } else if (szam.value == "e" && egyediSZ.value == "") {
        err.innerHTML = "Nincs megadva maximum szám"
        err.style.display = "block"

        return;
    } else if (muvJel.length == 0) {
        err.innerHTML = "Nincs megadva a művelet"
        err.style.display = "block"

        return;
    }

    let max = szam.value
    if (max == "e") max = egyediSZ.value

    if (max < 3) {
        err.innerHTML = "Nem lehet 3-nál kisebb a minimum"
        err.style.display = "block"

        return;
    }

    let muve = ""
    for (let i = 1; i < 11; i++) {
        let sz1 = Math.floor(Math.random() * max);
        let sz2 = Math.floor(Math.random() * max);
        let a = document.getElementById(`a${i}`)
        let b = document.getElementById(`b${i}`)
        let jel = document.getElementById(`jel${i}`) 

        muve = muvJel[Math.floor((Math.random()*muvJel.length))]

        jel.innerHTML = muve

        if (muve == "-") {
            while (sz1 < sz2) {
                sz1 = Math.floor(Math.random() * max);
                sz2 = Math.floor(Math.random() * max);
            }
            a.innerHTML = sz1
            b.innerHTML = sz2
        } else if (muve == "/") {
            let maxx = max - 2
            sz1 = Math.floor(Math.random() * maxx) +2;
            sz2 = Math.floor(Math.random() * maxx) +2;
            let remainder = sz1 % sz2
            while (remainder != 0 && sz1 == 0) {
                console.log(maxx)
                sz1 = Math.floor(Math.random() * maxx) +2;
                sz2 = Math.floor(Math.random() * maxx) +2;
                remainder = sz1 % sz2

                console.log( sz1 +" "+ sz2)
            }
            a.innerHTML = sz1
            b.innerHTML = sz2
        } else if (muve == "*") {
            let maxx = max - 2
            sz1 = Math.floor(Math.random() * maxx) +2;
            sz2 = Math.floor(Math.random() * maxx) +2;
            a.innerHTML = sz1
            b.innerHTML = sz2
        } else {
            a.innerHTML = sz1
            b.innerHTML = sz2
        }
    }
    loader.classList.remove("disppear")
    time = true
    end = false
    pb.style.display = "none"
    setTimeout(() => {loader.classList.add("disppear")},450)
    setTimeout(() => {Time()},2500)
}

let oldMin = 0
let oldSec = 0

function Time() {
    if (!time) {
        return;
    }

    sec = oldSec
    min = oldMin

    sec += 1

    if (sec == 60) {
        sec = 0
        min += 1
    }

    oldSec = sec
    oldMin = min

    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    let timeNum = min + ":" + sec

    tim.innerHTML = timeNum

    setTimeout(() => {Time()}, 1000)
}

szam.oninput = function() {
    if (this.value == "e") {
        egyediSZ.style.display = "block"
    } else {
        egyediSZ.style.display = "none"
    }   
}

function Mark(num) {
    let mark = document.getElementById(`m${num}`)

    if (mark.checked) {
        mark.checked = false
    } else {
        mark.checked = true
    }
}