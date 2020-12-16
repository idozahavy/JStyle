export function getRandomStr(length = 10) {
  var result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result = result.concat(characters.charAt(Math.floor(Math.random() * characters.length)));
  }
  return result;
}

export function convertToStyleFormat(str) {
  let seq = str.slice(1, str.length);
  let result = str[0].toLowerCase();
  for (let i in seq) {
    let c = seq[i];
    result = result.concat(c >= "A" && c <= "Z" ? "-".concat(c.toLowerCase()) : c);
  }
  return result;
}
