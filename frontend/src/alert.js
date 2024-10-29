export const Alert = ({ nodes, edges, isDag }) => {
  return (
    <>
      {!nodes && !edges && !isDag ? (
        <div>Wait for 50 seconds as it is deployed on free service</div>
      ) : (
        <div>
          <div>Total Number of Nodes: {nodes}</div>
          <div>Total Number of Edges: {edges}</div>
          <div>Is it a DAG: {`${isDag}`}</div>
        </div>
      )}
    </>
  );
};
