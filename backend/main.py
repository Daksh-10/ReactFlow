from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict

app = FastAPI()

# Define allowed origins (here, allow requests from localhost:3000)
origins = [
    "http://localhost:3000", 
]

# Apply CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],             # Allow all HTTP methods
    allow_headers=["*"],             # Allow all headers
)

# Define the Pydantic models for request body validation

class Edge(BaseModel):
    source: str
    target: str

class GraphRequest(BaseModel):
    nodes: List[str]
    edges: List[Edge]

def is_dag(nodes, edges):
    # Create adjacency list for the graph
    graph = defaultdict(list)
    for edge in edges:
        graph[edge['source']].append(edge['target'])
    
    # visited and recursion stack sets
    visited = set()
    rec_stack = set()

    # Define recursive function to detect cycle using DFS
    def has_cycle(v):
        visited.add(v)
        rec_stack.add(v)
        
        for neighbor in graph[v]:
            if neighbor in rec_stack:
                return True
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True

        rec_stack.remove(v)
        return False

    for node in nodes:
        if node not in visited:
            if has_cycle(node):
                return False 

    return True  
@app.post('/pipelines/parse')
async def parse_pipeline(graph_request: GraphRequest):
    nodes = [node for node in graph_request.nodes]
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
