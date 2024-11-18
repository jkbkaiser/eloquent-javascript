function isEven(n) {
    function r(n) {
        if (n == 0) {
            return true;
        } else if (n == 1) {
            return false;
        } else {
            return r(n - 2);
        }
    }

    if (n < 0) {
        return r(-n);
    }
    return r(n);
}

console.log(isEven(-1));
