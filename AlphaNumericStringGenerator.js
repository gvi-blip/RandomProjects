function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const lowercase = [];
const uppercase = [];
for (let i = 97; i <= 122; i += 1) {
  lowercase.push(String.fromCharCode(i));
  uppercase.push(String.fromCharCode(i - 32));
}
exports.generateAlphaNumericSrting = (len) => {
  let string = "";
  for (let i = 0; i < len; i += 1) {
    switch (getRndInteger(1, 4)) {
      case 1:
        string += `${digits[getRndInteger(0, 9)]}`;
        break;
      case 2:
        string += `${lowercase[getRndInteger(0, 25)]}`;
        break;
      case 3:
        string += `${uppercase[getRndInteger(0, 25)]}`;
        break;
      default:
        break;
    }
  }
  return string;
};
