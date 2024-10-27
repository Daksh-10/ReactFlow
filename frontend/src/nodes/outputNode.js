// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import "./styles/styles.css";
import "./handle.css";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div className="container">
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div className="nodeName">
        <span>Output</span>
      </div>
      <div className="label">
        <label>
          Name:
          <input
            className="textField"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Type:
          <select
            className="custom-select"
            value={outputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};
