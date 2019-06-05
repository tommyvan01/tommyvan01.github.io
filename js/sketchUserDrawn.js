let y = [];
let x = [];
let fourierY;
let fourierX;
let drawing = [];
let time = 0;
let path = [];
let state = 0; // user = 0, drawing = 1
let down = 1; // down = 0, up = 1

function setup(){
    createCanvas(700, 450).parent("canvas-wrapper");
}

function mousePressed(){
    down = 0; // user sta disegnando
}

function mouseReleased(){
    down = 1; // user non disegna più
}

function keyPressed(){
    if(keyCode == ENTER && state != 1){ // se user preme ENTER 
        state = 1;
        for (let i = 0; i < drawing.length; i++) {
            x.push(drawing[i].x);
            y.push(drawing[i].y);
        }
        fourierY = dft(y);
        fourierX = dft(x);

        fourierY.sort((a, b) => b.amp - a.amp);
        fourierX.sort((a, b) => b.amp - a.amp);
    }
    if (keyCode == DELETE){
        if (state == 1) { // se gli epicicli disegnano
            path = []; // resetta tutto
            time = 0;
            x = [];
            y = [];
            drawing = [];
            state = 0; // input da user
        }
        else if (state == 0){ // se gli epicicli non disegnano
            drawing = []; // cancella i punti immessi dall'utente salvati
        }
    }
}

function epicycles(x, y, rotation, fourier){
    let px = x;
    let py = y;
    for (let k = 0; k < fourier.length; k++) {
        let radius = fourier[k].amp;
        let freq = fourier[k].freq;
        let phase = fourier[k].phase;

        noFill();
        stroke(0, 50);
        strokeWeight(1);
        ellipse(x, y, radius * 2); // cerchio
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);
        stroke(0);
        line(px, py, x, y); // linea tra i cerchi
        px = x;
        py = y;
    }
    return createVector(x, y);
}

function draw() {
    background(255);
    if (state == 0) { // se lo user può disegnare
        if(down == 0){ // se sta disegnando
            let add = false;
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= width) { // se sono dentro il canvas aggiungi sempre il punto
                add = true;
            } else {
                if (drawing.length > 0) { // aggiungi il punto solo se c'è già almento un punto nell'array drawing
                    add = true;
                }
            }
            if(add){
                drawing.push(createVector(mouseX - width / 2, mouseY - height / 2));
            }
        }
        noFill();
        strokeWeight(1);
        stroke(0);
        translate(width/2, height/2),
        beginShape();
        for (let v of drawing) {
            vertex(v.x, v.y);
        }
        endShape();
    }
    else if (state == 1){ // se gli epicicli stanno disegnando
        let vx = epicycles(width / 2, 50, 0, fourierX);
        let vy = epicycles(100, height / 2, HALF_PI, fourierY);
        let v = createVector(vx.x, vy.y);

        path.unshift(v); //aggiungo all'inizio della lista wave
        fill(0, 255, 0);
        ellipse(v.x, v.y, 3); // ultimo punto

        stroke(255, 0, 0);
        line(vx.x, vx.y, v.x, v.y);
        line(vy.x, vy.y, v.x, v.y);

        // disegno l'onda risultante
        noFill();
        stroke(0);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < path.length; i++) {
            vertex(path[i].x, path[i].y);
        }
        endShape();

        const dt = (2 * Math.PI) / fourierY.length;
        time += dt;

        if (time > TWO_PI) {
            time = 0;
            path = [];
        }
    }
}
