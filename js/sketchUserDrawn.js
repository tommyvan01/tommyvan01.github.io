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
    down = 0; // mouse is down
}

function mouseReleased(){
    down = 1;
}

function keyPressed(){
    if(keyCode == ENTER && state != 1){
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
        if (state == 1) {
            path = [];
            time = 0;
            x = [];
            y = [];
            drawing = [];
            state = 0; // I'm drawing
        }
        else if (state == 0){
            drawing = [];
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
        ellipse(x, y, radius * 2); // cerchio
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);
        strokeWeight(1);
        stroke(0);
        line(px, py, x, y); // linea tra i cerchi
        px = x;
        py = y;
    }
    return createVector(x, y);
}

function draw() {
    background(255);
    if (state == 0) {
        if(down == 0){
            let add = false;
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= width) { //if I'm inside the canvas always add a point
                add = true;
            } else { // otherwise...
                if (drawing.length > 0) { //add only if there's already a least a point in the drawing array
                    add = true;
                }
            }
            if(add){
                let point = createVector(mouseX - width / 2, mouseY - height / 2);
                drawing.push(point);
            }
        }
        noFill();
        strokeWeight(1);
        stroke(0);
        beginShape();
        for (let v of drawing) {
            vertex(v.x + width/2, v.y + height/2);
        }
        endShape();
    }
    else if (state == 1){
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
