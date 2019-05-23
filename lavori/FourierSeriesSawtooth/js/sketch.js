let time = 0; // tempo
let wave = []; // array che contiene i punti

let slider; // slider per numero di onde

function setup(){
    createCanvas(800, 400);
    frameRate(60);
    // slider per numero di onde da aggiungere
    slider = createSlider(1, 400, 30); // min, max, start
    slider.position(20, 40);
}

function draw() {
    background(0);
    // slider
    fill(255);
    textSize(20);
    text("# of waves: " + slider.value(), 20, 30);
    translate(200, 200);

    let radius = 75;
    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;
    
    for (let k = 0; k < slider.value(); k++){
        let n = k + 1;
        let s;
        if(n % 2 == 0){
            s = 1;
        }
        else{
            s = -1;
        }
        noFill();
        stroke(255, 50);
        ellipse(x, y, radius / n *2);
        x += radius * s / n * cos(n * time);
        y += radius * s / n * sin(-1 * n * time);
        stroke(255, 360);
        line(px, py, x, y);
        px = x;
        py = y;
    }
    wave.unshift(y);
    fill(0, 255, 0);
    ellipse(x, y, 6);
    
    noFill();
    translate(200, 0);
    stroke(255, 0, 0, 360);
    line(x - 200, y, 0, wave[0]);
    stroke(255, 360);
    beginShape();
    for (let i=0; i<wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();

    time += 0.03;
    if (time > TWO_PI){
        time = 0;
    }
    
    if(wave.length > 1000){
        wave.pop();
    }
}
