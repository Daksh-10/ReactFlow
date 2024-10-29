# DAG checker
A web application to check whether the created flowchart is a Directed Acyclic Graph or not. 

# Frontend
1. cd frontend
2. npm i
3. npm start

# Backend
You can use pycharm to create the virtual environment or follow the below steps.
1. python -m venv .venv
2. source .venv/bin/activate
3. which python (to check if the environment is created inside your project)
4. python -m pip install --upgrade pip (pip should be installed)
5. echo "*" > .venv/.gitignore
6. pip install "fastapi[standard]"
7. pip install uvicorn
8. uvicorn main:app --reload (to start the server)
