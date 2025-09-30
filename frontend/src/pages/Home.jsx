import { useState, useEffect } from "react";
import api from "../api";

function Home() {


  return (
    <h1
      style={{
        marginTop: "80px",       // push below navbar
        textAlign: "center",     // horizontal center
      }}
    >
      Welcome!
    </h1>
  );
}

export default Home;
