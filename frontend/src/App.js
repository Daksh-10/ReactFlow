import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useState } from "react";

function App() {
  const [Vertices, setVertices] = useState([]);
  const [Connections, setConnections] = useState([]);
  return (
    <div>
      <PipelineToolbar  />
      <PipelineUI Vertices={Vertices} setVertices={setVertices} Connections={Connections} setConnections={setConnections}/>
      <SubmitButton Vertices={Vertices} Connections={Connections} />
    </div>
  );
}

export default App;
