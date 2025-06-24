const tasas = {
  MXN: 19.1,
  EUR: 0.86,
  JPY: 145.91
};

const resultado = document.getElementById("resultado");

const obtenerTasa = (moneda) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tasas[moneda]) {
        resolve(tasas[moneda]);
      } else {
        reject("Moneda no válida");
      }
    }, 1000);
  });
};

const conversion = (cantidad, tasa, callback) => {
  setTimeout(() => {
    const convertido = cantidad * tasa;
    callback(convertido.toFixed(2));
  }, 500);
};

document.getElementById("convertir").addEventListener("click", () => {
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const moneda = document.getElementById("moneda").value;

  if (isNaN(cantidad) || !moneda) {
    resultado.textContent = "Completa los campos correctamente.";
    return;
  }

  resultado.textContent = "Convirtiendo...";

  obtenerTasa(moneda)
    .then(tasa => {
      conversion(cantidad, tasa, convertido => {
        resultado.textContent = `${cantidad} USD = ${convertido} ${moneda}`;
      });
    })
    .catch(error => {
      resultado.textContent = "Error: " + error;
    });
});

document.getElementById("moneda").addEventListener("change", (e) => {
  const moneda = e.target.value;
  if (moneda) {
    resultado.textContent = "Moneda seleccionada: " + moneda;
    setTimeout(() => {
      resultado.textContent += " | Tasa actual empleada: " + tasas[moneda];
    }, 900);
  }
});
