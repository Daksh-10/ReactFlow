// textNode.js

import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import "./styles/styles.css";
import "./handle.css";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textFieldRef = useRef(null);
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    const textField = textFieldRef.current;
    textField.style.height = "auto";
    textField.style.height = `${textField.scrollHeight}px`;
  };

  return (
    <div className="container">
      <div className="nodeName">
        <span>Text</span>
      </div>
      <div className="label">
        <label>
          Text:
          <textarea
            className="textArea"
            ref={textFieldRef}
            value={currText}
            onChange={handleTextChange}
          />
        </label>
      </div>

      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
