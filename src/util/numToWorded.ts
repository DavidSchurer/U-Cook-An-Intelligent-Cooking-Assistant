const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const thousands = ["", "thousand", "million", "billion", "trillion"];

export function numberToWords(num) {
  if (num === 0) return "zero";

  let word = '';
  let chunkCount = 0;

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      word = chunkToWords(chunk) + (thousands[chunkCount] ? " " + thousands[chunkCount] + " " : "") + word;
    }
    num = Math.floor(num / 1000);
    chunkCount++;
  }

  return word.trim();
}

export function convertNumbersInPhrase(phrase) {
    return phrase.replace(/\b\d+\b/g, match => numberToWords(parseInt(match)));
  }

function chunkToWords(chunk) {
  let chunkWord = '';

  let hundreds = Math.floor(chunk / 100);
  if (hundreds > 0) {
    chunkWord += units[hundreds] + " hundred ";
  }

  let remainder = chunk % 100;
  if (remainder > 0) {
    if (remainder < 10) {
      chunkWord += units[remainder];
    } else if (remainder < 20) {
      chunkWord += teens[remainder - 10];
    } else {
      let tensPart = Math.floor(remainder / 10);
      let unitsPart = remainder % 10;
      chunkWord += tens[tensPart];
      if (unitsPart > 0) {
        chunkWord += "-" + units[unitsPart];
      }
    }
  }

  return chunkWord.trim();
}