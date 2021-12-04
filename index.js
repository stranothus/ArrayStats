class StatsArray extends Array {
    constructor() {
        super();

        this.array = this.numbersOnly(...arguments);
    }
    numbersError(error) {
        arguments.slice(1).forEach((v, i) => {
            if(typeof v !== "numbers") console.error(error(v, i));
        })
    }
    numbersOnly() {
        return [...arguments].filter(v => typeof v === "number");
    }
    get value() {
        return this.array;
    }
    get sum() {
        return this.array.reduce((a, b) => a + b, 0);
    }
    get mean() {
        return this.sum / this.array.length;
    }
    push() {
        this.numbersError((v, i) => `Invalid type: StatsArray methods only allow type number. Type ${typeof v} is not allowed.`, ...arguments);
        this.array.push(...this.numbersOnly(...arguments));
    }
    slice(index, length, value) {
        this.numbersError((v, i) => `Invalid type: StatsArray methods only allow type number. Type ${typeof v} is not allowed.`, value);
        return new StatsArray(this.array.slice(index, length, value));
    }
    standardVariance(sample) {
        let n = this.array.length,
            x = this.mean;
        return this.array.map(Xi => Math.pow(Xi - x, 2)).reduce((a, b) => a + b, 0) / (sample ? n - 1 : n);
    }
    standardDeviation(sample) {
        return Math.sqrt(this.standardVariance(sample));
    }
    confidenceInterval(percent) {
        var MOE = percent * this.standardDeviation(true) / this.array.length,
            m = this.mean;
        return [m - MOE, m + MOE].sort((a, b) => a - b);
    }
    zScore(pop) {
        return (this.mean - pop) / this.standardDeviation(true);
    }
    randomSample(size) {
        let array = this.array;
        while(array.length > size) array.splice(Math.floor(Math.random() * array.length), 1);
        return new StatsArray(...array);
    }
}

let test = new StatsArray(0, 1, 1, 0, 1, 0, 0, 1, 1);

console.log(test.mean);