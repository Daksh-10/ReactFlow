import React from "react";
import "./styles/styles.css";
import "./handle.css";
import { useState } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
function CustomNode({ id, data }) {
  const [nodeName, setNodeName] = useState("CustomNode");
  const [currName, setCurrName] = useState(`${nodeName}-`);
  const [toggleNodeName, setToggleNodeName] = useState(false);
  const [valueType, setValueType] = useState("Text");
  const [options, setOptions] = useState(["Text"]);
  const [optionName, setOptionName] = useState("");
  const [toggleOption, setToggleOption] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [handleType, setHandleType] = useState("");
  const [position, setPosition] = useState("");
  const [idType, setIdType] = useState("");
  const [items, setItems] = useState([]);

  const updateNodeInternals = useUpdateNodeInternals();

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleNodeNameChange = (e) => {
    setNodeName(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setToggleNodeName(!toggleNodeName);
    }
  };

  const addNewOption = (e) => {
    setValueType(e.target.value);
    if (e.target.value === "Add") {
      setToggleOption(true);
    } else {
      setToggleOption(false);
    }
  };

  const handleKeyPressOption = (e) => {
    if (e.key === "Enter") {
      setOptions([...options, optionName]);
      setToggleOption(!toggleOption);
    }
  };

  const handleAddClick = () => setShowFields(!showFields);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      handleType,
      position,
      idType,
    };
    setItems([...items, newItem]);
    console.log(items);
    // Clear input fields

    setShowFields(false);
    updateNodeInternals(id);
  };

  return (
    <div className="container">
      <div className="nodeName">
        <label>
          {toggleNodeName ? (
            <div>{nodeName}</div>
          ) : (
            <input
              className="textField"
              type="text"
              value={nodeName}
              onChange={handleNodeNameChange}
              onKeyDown={handleKeyPress}
            />
          )}
        </label>
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
            value={valueType}
            onChange={addNewOption}
          >
            {options.map((value, ind) => (
              <option className="option" key={ind} value={value}>
                {value}
              </option>
            ))}
            {/* <option value="Text">Text</option> */}
            <option value="Add">AddOption</option>
          </select>
        </label>
        <button className="button" onClick={handleAddClick}>
          {showFields ? "Cancel" : "Add Handles"}
        </button>
        {toggleOption ? (
          <input
            className="textField"
            type="text"
            value={optionName}
            onChange={(e) => {
              setOptionName(e.target.value);
            }}
            onKeyDown={handleKeyPressOption}
          />
        ) : undefined}
      </div>

      {showFields && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="label">
            <label>Handle Type:</label>
            <input
              className="textField"
              type="text"
              value={handleType}
              onChange={(e) => setHandleType(e.target.value)}
              required
            />
          </div>
          <div className="label">
            <label>Position:</label>
            <select
              className="custom-select"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option className="option" value="right">
                Right
              </option>
              <option className="option" value="left">
                Left
              </option>
              <option className="option" value="top">
                Top
              </option>
              <option className="option" value="bottom">
                Bottom
              </option>
            </select>
          </div>
          <div className="label">
            <label>ID Type:</label>
            <input
              className="textField"
              type="text"
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      )}

      {items.map((item, ind) => (
        <Handle
          key={ind}
          type={item.handleType}
          position={item.position}
          id={`${id}-${item.idType}`}
        />
      ))}
    </div>
  );
}

export default CustomNode;
