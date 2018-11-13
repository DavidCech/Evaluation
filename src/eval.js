const keys = document.getElementById("print");

keys.addEventListener("click", event => {
  var input = document.getElementById("input-field").value;
  var mezivypocet = 0;
  var pocitadlo = 0;
  var cisla = [];
  var znamenka = [];

  for (var x = 0; x < input.length; x++) {
    if (jeZnamenko(input.charAt(x)) && x != input.length - 1 && x != 0) {
      znamenka = [...znamenka, input.charAt(x)];
    } else if (jeCislo(parseInt(input.charAt(x)))) {
      var promenna = "";
      for (var y = x; y < input.length; y++) {
        if (jeCislo(parseInt(input.charAt(y)))) {
          promenna += input.charAt(y);
          pocitadlo++;
        } else {
          break;
        }
      }
      x += pocitadlo - 1;
      cisla = [...cisla, parseInt(promenna)];
      pocitadlo = 0;
    } else {
      mezivypocet =
        "Špatně zadaný výraz, bereme pouze čísla a základní operace";
      break;
    }
  }

  for (var x = 0; x < znamenka.length; x++) {
    if (znamenka[x] == "*" || znamenka[x] == "/") {
      cisla[x] = pocitej(cisla[x], cisla[x + 1], znamenka[x]);
      cisla.splice(x + 1, 1);
      znamenka.splice(x, 1);
      x = x - 1;
    }
  }

  for (var x = 0; x < znamenka.length; x++) {
    if (znamenka[x] == "+" || znamenka[x] == "-") {
      cisla[x] = pocitej(cisla[x], cisla[x + 1], znamenka[x]);
      cisla.splice(x + 1, 1);
      znamenka.splice(x, 1);
      x = x - 1;
    }
  }
  document.getElementById("output-field").value = cisla[0];
});

function jeCislo(n) {
  var cisla = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  for (var x = 0; x < 10; x++) {
    if (n == cisla[x]) {
      return true;
    }
  }
  return false;
}

function jeZnamenko(n) {
  var znamenka = ["-", "+", "*", "/"];
  for (var x = 0; x < 10; x++) {
    if (n == znamenka[x]) {
      return true;
    }
  }
  return false;
}

function pocitej(n, m, operator) {
  if (operator == "+") {
    return parseInt(n) + parseInt(m);
  } else if (operator == "-") {
    return parseInt(n) - parseInt(m);
  } else if (operator == "*") {
    return parseInt(n) * parseInt(m);
  } else if (operator == "/") {
    return parseInt(n) / parseInt(m);
  }
}
