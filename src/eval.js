const keys = document.getElementById("print");
var jeVyrazValidni = true;

keys.addEventListener("click", event => {
  var input = document.getElementById("input-field").value;
  var pocitadlo = 0;
  var cisla = [];
  var znamenka = [];

  //Rozděluji čísla a znaménka do dvou polí, kontroluji, zda je výraz zadaný správně
  for (var x = 0; x < input.length; x++) {
    if (
      jeZnamenko(input.charAt(x)) &&
      x != input.length - 1 &&
      x != 0 &&
      !jeZnamenko(input.charAt(x - 1))
    ) {
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
      document.getElementById("output-field").value =
        "Špatně zadaný výraz, bereme pouze přirozená čísla, základní operace a to bez závorek";
      jeVyrazValidni = false;
    }
  }

  //Vypisuji výsledek do pole.
  document.getElementById("output-field").value = vycisli(cisla, znamenka);
});

//Metoda, která kontroluje, zda je parametr číslem.
function jeCislo(n) {
  var cisla = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  for (var x = 0; x < cisla.length; x++) {
    if (n == cisla[x]) {
      return true;
    }
  }
  return false;
}

//Metoda, která kontroluje, zda je parametr znaménkem.
function jeZnamenko(n) {
  var znamenka = ["-", "+", "*", "/"];
  for (var x = 0; x < znamenka.length; x++) {
    if (n == znamenka[x]) {
      return true;
    }
  }
  return false;
}

//Metoda, která provádí matematické operace a kontroluje dělení 0.
function pocitej(n, m, operator) {
  if (operator == "+") {
    return parseInt(n) + parseInt(m);
  } else if (operator == "-") {
    return parseInt(n) - parseInt(m);
  } else if (operator == "*") {
    return parseInt(n) * parseInt(m);
  } else if (operator == "/" && m != 0) {
    return parseInt(n) / parseInt(m);
  } else {
    jeVyrazValidni = false;
  }
}

/*V této metodě neelegantně vyčísluji výraz, nejprve dělení a násobení, jelikož má
 větší prioritu, poté sčítání a odčítání. Nakonec vracím buď hodnotu výrazu, nebo kárám
 uživatele za přestupek.*/
function vycisli(cisla, znamenka) {
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
  if (jeVyrazValidni) {
    return cisla[0];
  } else {
    jeVyrazValidni = true;
    return "Špatně zadaný výraz";
  }
}
