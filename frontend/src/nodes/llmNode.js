// llmNode.js

import { Handle, Position } from "reactflow";
import "./styles/styles.css";
import "./styles/handle.css";

export const LLMNode = ({ id, data }) => {
  return (
    <div className="container">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <div className="nodeName">
        <span>LLM</span>
      </div>
      <div className="label">
        <span>This is a LLM.</span>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </div>
  );
};
