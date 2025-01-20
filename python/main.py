from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importation des modules de DeepCategory, DeepMagasin, et DeepCommande
from deepcategory import router as deepcategory_router
from deepmagasin import router as deepmagasin_router
from deepcommande import router as deepcommande_router

# Création de l'application FastAPI
app = FastAPI()

# Ajouter le middleware CORS
origins = [
    "http://localhost",  # Autoriser les requêtes depuis http://localhost
    "http://localhost:8080",  # Autoriser les requêtes depuis http://localhost:8080 (par exemple, pour Angular)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Liste des origines autorisées
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Ajouter les routers pour DeepCategory, DeepMagasin, et DeepCommande
app.include_router(deepcategory_router)
app.include_router(deepmagasin_router)
app.include_router(deepcommande_router)

# Route principale
@app.get("/hello")
def root():
    return {"message": "Hello, world!"}

