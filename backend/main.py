from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict

app = FastAPI()

# Define the Pydantic models for request body validation
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class GraphRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes, edges):
    # Create adjacency list for the graph
    graph = defaultdict(list)
    for edge in edges:
        graph[edge['source']].append(edge['target'])
    
    # Initialize visited and recursion stack sets
    visited = set()
    rec_stack = set()

    # Define recursive function to detect cycle using DFS
    def has_cycle(v):
        # Mark the current node as visited and add to recursion stack
        visited.add(v)
        rec_stack.add(v)
        
        # Recur for all vertices adjacent to this vertex
        for neighbor in graph[v]:
            # If the neighbor is in the recursion stack, we found a cycle
            if neighbor in rec_stack:
                return True
            # If the neighbor hasn't been visited, recur for it
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True

        # Remove the vertex from recursion stack and return False
        rec_stack.remove(v)
        return False

    # Check each node; the graph might be disconnected
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if has_cycle(node_id):
                return False  # Graph has a cycle, so it's not a DAG

    return True  # No cycles found, so it is a DAG
@app.get('/pipelines/parse')
def parse_pipeline(graph_request: GraphRequest):
    nodes = [{"id": node.id} for node in graph_request.nodes]
    edges = [{"source": edge.source, "target": edge.target} for edge in graph_request.edges]

    # Calculate the number of nodes and edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Check if the graph is a DAG
    is_dag_result = is_dag(nodes, edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }
