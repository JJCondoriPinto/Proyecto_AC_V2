import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ahorcado from "./Ahorcado";
import Test from "./Test";
import Memorama from "./Memorama";

const JuegoVista = () => {
  const { juego } = useParams();

  return (
    <div>
      <h1>Juego - {juego}</h1>
      <div>
        {juego === "ahorcado" && <Ahorcado />}
        {juego === "test" && <Test />}
        {juego === "memorama" && <Memorama />}
      </div>
    </div>
  );
};

export default JuegoVista;
