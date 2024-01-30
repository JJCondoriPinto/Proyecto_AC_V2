import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Ahorcado = () => {
  const { juego } = useParams();
  const [palabraOculta, setPalabraOculta] = useState([]);
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
    const palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    setPalabraOculta(palabraSeleccionada.split(""));
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
      .map((letra) => (letrasAdivinadas.includes(letra) ? letra : "_"))
      .join(" ");
  };

  const LetraCuadro = ({ letra }) => (
    <div className="border border-gray-300 rounded-md p-2 m-1">
      {letrasAdivinadas.includes(letra) ? letra : "_"}
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-4  ">
      <div className="flex items-center">
        <p>Vidas restantes: {vidas}</p>
        {[...Array(vidas)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faHeart} style={{ color: "red", margin: "2px" }} />
        ))}
      </div>
      <div className="overflow-auto flex items-center h-full">
        {palabraOculta.map((letra, index) => (
          <LetraCuadro key={index} letra={letra} />
        ))}
      </div>
      {estadoJuego === "jugando" && (
        <div className="flex items-center space-x-2 ">
          <input
            type="text"
            id="letra"
            placeholder="Introduce una letra"
            maxLength="1"
            value={inputLetra}
            onChange={(e) => setInputLetra(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button onClick={comprobarLetra} className="bg-gray-300 p-2 rounded-full hover:bg-gray-600 hover:text-white">
            Comprobar
          </button>
        </div>
      )}
      {(estadoJuego === "perdido" || estadoJuego === "ganado") && (
        <button onClick={reiniciarJuego} className="bg-gray-300 p-2 rounded-full hover:bg-gray-600 hover:text-white">
          Reiniciar
        </button>
      )}
      <div>
        <p>Letras adivinadas: {letrasAdivinadas.join(", ")}</p>
        <p>Letras incorrectas: {letrasIncorrectas.join(", ")}</p>
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
