let time = 0; // tempo
let wave = []; // array che contiene i punti

let slider; // slider per numero di onde

function setup(){
    createCanvas(800, 400);
    frameRate(30);
    // slider per numero di onde da aggiungere
    slider = createSlider(1, 400, 30); // min, max, start
    slider.position(20, 40);
}

function draw() {
    background(0);
    // slider
    fill(255);
    textSize(20);
    strokeWeight(1);
    text("# of waves: " + slider.value(), 20, 30);
    translate(200, 200);

    let radius = 100;
    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;
    
    for (let k = 0; k < slider.value(); k++){
        let n = 2 * k + 1;
        noFill();
        stroke(255, 50);
        ellipse(x, y, radius / n *2); // cerchio
        x += radius / (n) * cos(n * time);
        y += radius / (n) * sin(n * time);
        stroke(255);
        line(px, py, x, y); // linea tra i cerchi
        px = x;
        py = y;
    }
    wave.unshift(y); //aggiungo all'inizio della lista wave
    fill(0, 255, 0);
    ellipse(x, y, 8); // ultimo punto
    
    // riga tra l'ultimo punto della lista wave e il punto rotante
    translate(200, 0);
    stroke(255, 0, 0);
    line(x - 200, y, 0, wave[0]);
    
    // disegno l'onda risultante
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (let i=0; i<wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();

    time += 0.03;
    if (time > TWO_PI){
        time = 0;
    }
    
    // rimuovo l'ultimo punto della lista per ottimizzazione di memoria
    if(wave.length > 500){
        wave.pop();
    }
}
