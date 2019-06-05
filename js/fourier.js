function dft(x){
    let X = [];
    const N = x.length;
    
    for (let k = 0; k < N; k++) {
        let re = 0; // parte reale del numero complesso
        let im = 0; // parte immaginaria del numero complesso
        for (let n = 0; n < N; n++){
            let angle = (2 * Math.PI * k * n) / N;
            re += x[n] * cos(angle);
            im -= x[n] * sin(angle);
        }

        // solitamente si normalizza sulla lunghezza dell'array
        re = re / N;
        im = im / N;

        let amplitude = sqrt(re * re + im * im); // ampiezza è valore assoluto del numero complesso
        let phase = atan2(im, re); // fase iniziale è angolo del numero complesso nel piano complesso
        let frequency = k;

        X[k] = { // dichiarazione di un oggetto (simile a un record del linguaggio C)
            re: re,
            im: im,
            freq: frequency,
            phase: phase,
            amp: amplitude
        };
    }
    return X;
}