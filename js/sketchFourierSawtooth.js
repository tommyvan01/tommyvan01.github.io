let time = 0; // tempo
let wave = []; // array che contiene i punti
let maxWaves = 400;
let slider; // slider per numero di onde

function setup(){
    createCanvas(800, 400).parent("canvas-wrapper");
    frameRate(30);
    // slider per numero di onde da aggiungere
    slider = createSlider(1, maxWaves, 30); // min, max, start
    slider.parent("slider-wrapper");
}

function draw() {
    background(255);
    // slider
    fill(0);
    textSize(20);
    text("Number of circles: " + slider.value() + " (max: " + maxWaves + ")", 5, 30);
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
            s = -1;
        }
        else{
            s = 1;
        }
        noFill();
        stroke(0, 50);
        ellipse(x, y, radius / n *2);
        x += radius / (s * n) * cos(n * time);
        y += radius / (s * n) * sin(n * time);
        stroke(0);
        line(px, py, x, y);
        px = x;
        py = y;
    }
    wave.unshift(y);
    fill(0, 255, 0);
    ellipse(x, y, 6);
    
    noFill();
    translate(200, 0);
    stroke(255, 0, 0);
    line(x - 200, y, 0, wave[0]);
    stroke(0);
    beginShape();
    for (let i=0; i<wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();

    time -= 0.04;
    
    if(wave.length > 1000){
        wave.pop();
    }
}
