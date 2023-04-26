import { Route, Routes } from "react-router";
import Meme from "./Meme";
import GeneratedMeme from "./GeneratedMeme";

function App() {
  return (
    <div>
      <h1>Meme Generator</h1>
    <Routes>
      <Route path="/" element={<Meme />} />
      <Route path="/generated" element={<GeneratedMeme />} />
    </Routes>
    </div>
  );
}

export default App;
