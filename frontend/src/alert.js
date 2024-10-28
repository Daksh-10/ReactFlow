export const Alert = ({nodes, edges, isDag}) => {

    return <>
        <div>
            <div>Total Number of Nodes: {nodes}</div>
            <div>Total Number of Edges: {edges}</div>
            <div>Is it a DAG: {`${isDag}`}</div>
        </div>
    </>
}