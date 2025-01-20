from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import mysql.connector

router = APIRouter()

# Fonction pour se connecter à la base de données MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="AA0556563a",
        database="deep"
    )

# Modèle Pydantic pour `DeepMagasin`
class DeepMagasin(BaseModel):
    name: str  # Nom du magasin
    adresse: str  # Adresse du magasin
    produit: str  # Produit vendu
    produitdetails: str  # Détails sur le produit
    produitprix: float  # Prix du produit
    category_name: str  # Nom de la catégorie du produit

# Route pour récupérer tous les magasins
@router.get("/getmagasin")
def get_magasin():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, adresse, produit, produitdetails, produitprix, category_name FROM deepmagasin")
    magasins = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"magasins": magasins}

# Route pour ajouter un magasin
@router.post("/addmagasin")
def add_magasin(new_magasin: DeepMagasin):
    conn = get_db_connection()
    cursor = conn.cursor()
    try: 
        cursor.execute(
            "INSERT INTO deepmagasin (name, adresse, produit, produitdetails, produitprix, category_name) VALUES (%s, %s, %s, %s, %s, %s)",
            (new_magasin.name, new_magasin.adresse, new_magasin.produit, new_magasin.produitdetails, new_magasin.produitprix, new_magasin.category_name)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Magasin ajouté avec succès!"}
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'ajout du magasin: {err}")

# Route pour supprimer un magasin par ID
@router.delete("/deletemagasin/{magasin_id}")
def delete_magasin(magasin_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM deepmagasin WHERE id = %s", (magasin_id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Magasin non trouvé")

    cursor.close()
    conn.close()
    return {"message": "Magasin supprimé avec succès!"}

# Route pour mettre à jour un magasin
@router.put("/updatemagasin/{magasin_id}")
def update_magasin(magasin_id: int, updated_magasin: DeepMagasin):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE deepmagasin SET name = %s, adresse = %s, produit = %s, produitdetails = %s, produitprix = %s, category_name = %s WHERE id = %s",
            (updated_magasin.name, updated_magasin.adresse, updated_magasin.produit, updated_magasin.produitdetails, updated_magasin.produitprix, updated_magasin.category_name, magasin_id)
        )
        conn.commit()

        if cursor.rowcount == 0:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Magasin non trouvé")

        cursor.close()
        conn.close()
        return {"message": "Magasin mis à jour avec succès!"}
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erreur lors de la mise à jour du magasin: {err}")
