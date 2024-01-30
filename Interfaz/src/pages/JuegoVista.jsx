import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ahorcado from "./Ahorcado";
import Test from "./Test";

const JuegoVista = () => {
  const { juego } = useParams();

  return (
    <div>
      <h1>Juego - {juego}</h1>
      <div>
        {juego === "ahorcado" && <Ahorcado />}
        {juego === "test" && <Test />}
      </div>
    </div>
  );
};

export default JuegoVista;
