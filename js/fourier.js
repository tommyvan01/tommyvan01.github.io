function dft(x){
    let X = [];
    const N = x.length;
    
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++){
            let angle = (2 * Math.PI * k * n) / N;
            re += x[n] * cos(angle);
            im -= x[n] * sin(angle);
        }
        re = re / N;
        im = im / N;

        let amplitude = sqrt(re * re + im * im);
        let phase = atan2(im, re);
        let frequency = k;

        X[k] = {
            re: re,
            im: im,
            freq: frequency,
            phase: phase,
            amp: amplitude
        };
    }
    return X;
}