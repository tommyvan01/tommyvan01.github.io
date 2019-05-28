let links = [];
let container;
let textSize = 20;
let bd;
let data;
let disp;
let p;

function setup() {
    noCanvas();
    bd = select("body");
    bd.style("font-size", textSize + "px"); 
    container = select("#link");
    container.style("padding-bottom", textSize + "px").style("padding-top", textSize + "px");
    links = selectAll("a");
    for (let el of links){
        el.mouseOver(removePadding).mouseOut(addPadding);
    }
    
    data = new Date();
    disp = data.toDateString();
    p = createP(disp.slice(disp.indexOf(" "), disp.length)).parent("time");
}

function removePadding(){
    container.style("padding-bottom", "0px").style("padding-top", "0px");
    this.style("background-color", "rgb(237, 237, 237").style("border-radius", "10px").style("padding", "4px 8px");
}

function addPadding(){
    container.style("padding-bottom", textSize + "px").style("padding-top", textSize + "px");
    this.style("background-color", "white");
}