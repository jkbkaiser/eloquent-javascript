function loop(val, cond, incr, func) {
  for (let i = val; cond(i); i = incr(i)) {
    func(i);
  }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log,
);
