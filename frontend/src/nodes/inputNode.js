// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import "./styles/styles.css";
import "./handle.css";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="container">
      <div className="nodeName">
        <span>Input</span>
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
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
};
