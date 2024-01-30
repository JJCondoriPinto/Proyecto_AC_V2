import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Ahorcado = () => {
  const { juego } = useParams();
  const [palabraOculta, setPalabraOculta] = useState("");
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [letrasIncorrectas, setLetrasIncorrectas] = useState([]);
  const [vidas, setVidas] = useState(6);
  const [inputLetra, setInputLetra] = useState("");
  const [estadoJuego, setEstadoJuego] = useState("jugando");

  useEffect(() => {
    reiniciarJuego();
  }, [juego]);

  const reiniciarJuego = () => {
    const palabras = ["perro", "gato", "casa", "árbol", "coche"];
    setPalabraOculta(palabras[Math.floor(Math.random() * palabras.length)]);
    setLetrasAdivinadas([]);
    setLetrasIncorrectas([]);
    setVidas(6);
    setInputLetra("");
    setEstadoJuego("jugando");
  };

  const comprobarLetra = () => {
    const letraInput = inputLetra.toLowerCase();

    if (letraInput.match(/^[a-z]$/) && !letrasAdivinadas.includes(letraInput) && !letrasIncorrectas.includes(letraInput)) {
      if (palabraOculta.includes(letraInput)) {
        setLetrasAdivinadas([...letrasAdivinadas, letraInput]);
      } else {
        setLetrasIncorrectas([...letrasIncorrectas, letraInput]);
        setVidas(vidas - 1);

        if (vidas === 1) {
          setEstadoJuego("perdido");
        }
      }
    }

    setInputLetra("");
    
    // Verificar si todas las letras han sido adivinadas
    if (!getPalabraOculta().includes("_")) {
      setEstadoJuego("ganado");
    }
  };

  const haTerminado = () => {
    return vidas === 0 || !getPalabraOculta().includes("_");
  };

  const getPalabraOculta = () => {
    return palabraOculta
      .split("")
      .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
      .join(" ");
  };
  //cambios
  const dibujoAhorcado = () => {
    const dibujo = [
      "  ________",
      " |        |",
      " |        " + (vidas < 6 ? "O" : ""),
      " |       " + (vidas < 5 ? "/" : "") + (vidas < 4 ? "|" : "") + (vidas < 3 ? "\\" : ""),
      " |       " + (vidas < 2 ? "/" : "") + " " + (vidas < 1 ? "\\" : ""),
      " |",
      " |___"
    ];

    return dibujo.map((line, index) => <div key={index}>{line}</div>);
  };

  return (
    <div>
      <div>
        {dibujoAhorcado()}
      </div>
      <div>
        <p>Palabra oculta: {getPalabraOculta()}</p>
        <p>Letras adivinadas: {letrasAdivinadas.join(", ")}</p>
        <p>Letras incorrectas: {letrasIncorrectas.join(", ")}</p>
        {estadoJuego === "jugando" && (
          <>
            <input
              type="text"
              id="letra"
              placeholder="Introduce una letra"
              maxLength="1"
              value={inputLetra}
              onChange={(e) => setInputLetra(e.target.value)}
            />
            <button onClick={comprobarLetra}>Comprobar</button>
          </>
        )}
        {(estadoJuego === "perdido" || estadoJuego === "ganado") && (
          <button onClick={reiniciarJuego}>Reiniciar</button>
        )}
      </div>
      <div>
        <p>Vidas restantes: {vidas}</p>
        {[...Array(vidas)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faHeart} style={{ color: "red", margin: "2px" }} />
        ))}
      </div>
      {haTerminado() && (
        <div>
          {vidas === 0 ? "Has perdido" : "¡Felicidades! Has ganado"}
        </div>
      )}
    </div>
  );
};

export default Ahorcado;