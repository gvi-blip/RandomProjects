let c3 = 0;
let c5 = 0;
for (let i = 1; i <= 100; i++) {
  c3++;
  c5++;
  let d = "";
  if (c3 == 3) {
    d += "fizz";
    c3 = 0;
  }
  if (c5 == 5) {
    d += "buzz";
    c5 = 0;
  }
  if (d !== "") {
    console.log(d);
  } else {
    console.log(i);
  }
}
