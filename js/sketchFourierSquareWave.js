let time = 0; // tempo
let wave = []; // array che contiene i punti
let maxWaves = 400; // numero massimo di onde da poter aggiungere
let slider; // slider per numero di onde

function setup(){
    createCanvas(800, 400).parent("canvas-wrapper"); // creo un canvas e gli assegno #canvas-wrapper come padre per posizionarlo nella pagina
    frameRate(30); // framerate medio per non dare troppi calcoli al processore
    slider = createSlider(1, maxWaves, 30).parent("slider-wrapper"); // (min, max, start) e assegno #slider-wrapper come padre per posizionarlo nella pagina
}

function draw() {
    background(255); // sfondo
    // slider
    fill(0);
    textSize(20);
    strokeWeight(1);
    text("Number of circles: " + slider.value() + " (max: " + maxWaves + ")", 5, 30); // stampo il numero di cerchi che sto aggiungendo accedendo al valore di slider con .value()

    translate(200, 200);
    let radius = 100;
    let x = 0;
    let y = 0;
    let px = 0; // x del punto precedente
    let py = 0; // y del punto precedente
    
    for (let k = 0; k < slider.value(); k++){
        let n = 2 * k + 1;
        noFill();
        stroke(0, 50);
        ellipse(x, y, radius / n *2); // cerchio
        x += radius / (n) * cos(n * time);
        y += radius / (n) * sin(n * time);
        stroke(0);
        line(px, py, x, y); // linea tra un cerchio e quello precedente più grande
        px = x;
        py = y;
    }
    wave.unshift(y); // aggiungo il punto all'inizio della lista dei punti
    fill(0, 255, 0);
    ellipse(x, y, 8); // disegno l'ultimo punto
    
    // linea tra l'ultimo punto della lista wave e il punto rotante
    translate(200, 0);
    stroke(255, 0, 0);
    line(x - 200, y, 0, wave[0]);
    
    // disegno l'onda risultante
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < wave.length; i++){
        vertex(i, wave[i]);
    }
    endShape();

    time -= 0.04;
    
    // rimuovo l'ultimo punto della lista per ottimizzazione di memoria
    if(wave.length > 1000){
        wave.pop();
    }
}
