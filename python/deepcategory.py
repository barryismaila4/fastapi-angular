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

# Modèle Pydantic pour `DeepCategory`
class DeepCategory(BaseModel):
    name: str

# Route pour récupérer toutes les catégories
@router.get("/getcategory")
def get_category():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM deepcategory")
    categories = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"categories": categories}

# Route pour ajouter une nouvelle catégorie
@router.post("/addcategory")
def add_category(new_category: DeepCategory):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO deepcategory (name) VALUES (%s)", (new_category.name,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Category added successfully!"}

# Route pour supprimer une catégorie par ID
@router.delete("/deletecategory/{category_id}")
def delete_category(category_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM deepcategory WHERE id = %s", (category_id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Category not found")

    cursor.close()
    conn.close()
    return {"message": "Category deleted successfully!"}

# Route pour mettre à jour une catégorie
@router.put("/updatecategory/{category_id}")
def update_category(category_id: int, updated_category: DeepCategory):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE deepcategory SET name = %s WHERE id = %s", (updated_category.name, category_id))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Category not found")

    cursor.close()
    conn.close()
    return {"message": "Category updated successfully!"}
