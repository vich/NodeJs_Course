function sum(a, b){
    return new Promise((res, rej) => setTimeout(() => res(a+b), 1000));
}


module.exports = {
    sum
};