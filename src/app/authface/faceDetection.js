import * as faceapi from "face-api.js";

export default function TestFaceAPI() {
  console.log("Face-api.js version :", faceapi.version);
  console.log("Modèles disponibles :", Object.keys(faceapi.nets));

  return <h1>Vérification de Face-api.js (Regarde la console)</h1>;
}
