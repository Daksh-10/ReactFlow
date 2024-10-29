// submit.js
import "./styles/submit.css";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "./alert.js";
import "react-toastify/dist/ReactToastify.css";

export const SubmitButton = ({ Vertices, Connections }) => {
  useEffect(() => {
    console.log(Vertices, Connections);
  }, [Vertices, Connections]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://reactflow-2.onrender.com/pipelines/parse",
        {
          nodes: Vertices,
          edges: Connections,
        }
      );
      toast.success(
        <Alert
          nodes={response.data.num_nodes}
          edges={response.data.num_edges}
          isDag={response.data.is_dag}
        />
      );
    } catch (error) {
      console.error("Error submitting graph:", error);
      toast.success(<Alert />);
    }
  };

  return (
    <div
      onClick={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button className="submit" type="submit">
        Submit
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
};
