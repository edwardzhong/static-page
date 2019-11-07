const nav = document.getElementById("nav");
const as = nav.querySelectorAll("a");
const lan = document.getElementById("version");
const order = document.getElementById("order");
const orderlay = document.getElementsByClassName("order")[0];
const driver = document.getElementById("become");
const driverlay = document.getElementsByClassName("become")[0];
const modal = document.getElementsByClassName("modal")[0];
const serNav = document.getElementById("driverSer");
const serCons = document.getElementById("driverCon").children;
const body = document.body;
const ids = ["header", "service", "driver", "contact"];
const hs = [];

lan.onchange = function(e) {
    const val = this.value;
    location.href = val == 1 ? "index.html" : "index_en.html";
};

ids.forEach(function(id) {
    hs.push(document.getElementById(id).offsetTop);
});

nav.onclick = function(e) {
    const target = e.target || e.srcElement;
    if (target.nodeName !== "A") return;
    const id = target.getAttribute("href").substr(1);
    const elem = document.getElementById(id);
    const act = nav.querySelector("a.active");
    if (act) {
        act.className = "";
    }
    target.className = "active";
    if (elem && elem.scrollIntoView) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
    }
};
serNav.onclick = function(e) {
    const target = e.target || e.srcElement;
    if (target.nodeName !== "LI") return;
    const act = serNav.querySelector(".active");
    if (act) {
        act.className = "";
    }
    target.className = "active";
    const i = parseInt(target.getAttribute("data-i"), 10);
    select(serCons, i, "inner");
};

~(function watchScrollTop() {
    const st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < hs.length; i++) {
        if (st > hs[i] - 30) {
            select(as, i);
        }
        if (st > 3200) {
            select(as, 3);
        }
    }
    // setTimeout(watchScrollTop, 300);
})();

function select(els, l, cls) {
    for (let i = 0; i < 4; i++) {
        if (i == l) {
            els[i].className = (cls || "") + " active";
            continue;
        }
        els[i].className = cls || "";
    }
}

order.onclick = function(e) {
    body.style.overflow = "hidden";
    modal.classList.add("active");
    orderlay.classList.add("active");
};

orderlay.getElementsByClassName("close")[0].onclick = function(e) {
    body.style.overflow = "";
    modal.classList.remove("active");
    orderlay.classList.remove("active");
};

driver.onclick = function(e) {
    body.style.overflow = "hidden";
    modal.classList.add("active");
    driverlay.classList.add("active");
};

driverlay.getElementsByClassName("close")[0].onclick = function(e) {
    body.style.overflow = "";
    modal.classList.remove("active");
    driverlay.classList.remove("active");
};
