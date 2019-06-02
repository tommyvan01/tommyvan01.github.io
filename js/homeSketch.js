let links = [];
let container;
let textSize = 20;
let bd;
let data, day, hour;
let p;

function setup() {
    noCanvas();
    frameRate(2);
    bd = select("body");
    bd.style("font-size", textSize + "px"); 
    container = select("#link");
    container.style("padding-bottom", textSize + "px").style("padding-top", textSize + "px");
    links = selectAll("a", "#link");
    for (let el of links){
        el.mouseOver(removePadding).mouseOut(addPadding);
    }
    p = createP("").parent("time");
}

function draw(){
    data = new Date();
    day = data.toDateString();
    hour = data.toTimeString();
    p.html(hour.slice(0, hour.indexOf(" ")) + " - " + day.slice(day.indexOf(" "), day.length));
}

function removePadding(){
    container.style("padding-bottom", "0px").style("padding-top", "0px");
    this.style("background-color", "rgb(240, 240, 240").style("border-radius", "10px").style("padding", "4px 8px");
}

function addPadding(){
    container.style("padding-bottom", textSize + "px").style("padding-top", textSize + "px");
    this.style("background-color", "white");
}
