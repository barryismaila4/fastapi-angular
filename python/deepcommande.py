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

# Modèle Pydantic pour `DeepCommande`
# Modèle Pydantic pour `DeepCommande` avec les nouveaux champs
class DeepCommande(BaseModel):
    magasin_name: str  # Nom du magasin lié à la commande
    product_name: str  # Nom du produit commandé
    quantity: int  # Quantité commandée
    username: str  # Nom de l'utilisateur qui passe la commande
    usernumber: str  # Numéro de téléphone de l'utilisateur


# Vérifier si un magasin existe dans la table DeepMagasin
def check_magasin_exists(magasin_name: str, conn):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM deepmagasin WHERE name = %s", (magasin_name,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] > 0  # Retourne True si le magasin existe, sinon False

# Route pour récupérer toutes les commandes
@router.get("/getcommande")
def get_commande():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM deepcommande")
    commandes = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"commandes": commandes}

# Route pour ajouter une commande
@router.post("/addcommande")
def add_commande(new_commande: DeepCommande):
    conn = get_db_connection()
    
    # Vérifier si le magasin existe dans la table DeepMagasin
    if not check_magasin_exists(new_commande.magasin_name, conn):
        conn.close()
        raise HTTPException(status_code=404, detail="Magasin non trouvé")

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO deepcommande (magasin_name, product_name, quantity, username, usernumber) VALUES (%s, %s, %s, %s, %s)",
            (new_commande.magasin_name, new_commande.product_name, new_commande.quantity, new_commande.username, new_commande.usernumber)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Commande ajoutée avec succès!"}
    
    except mysql.connector.Error as err:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'ajout de la commande: {err}")
# Route pour supprimer une commande par ID
@router.delete("/deletecommande/{commande_id}")
def delete_commande(commande_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM deepcommande WHERE id = %s", (commande_id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Commande non trouvée")

    cursor.close()
    conn.close()
    return {"message": "Commande supprimée avec succès!"}

# Route pour mettre à jour une commande
@router.put("/updatecommande/{commande_id}")
def update_commande(commande_id: int, updated_commande: DeepCommande):
    conn = get_db_connection()
    
    # Vérifier si le magasin existe dans la table DeepMagasin
    if not check_magasin_exists(updated_commande.magasin_name, conn):
        conn.close()
        raise HTTPException(status_code=404, detail="Magasin non trouvé")

    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE deepcommande SET magasin_name = %s, product_name = %s, quantity = %s WHERE id = %s",
            (updated_commande.magasin_name, updated_commande.product_name, updated_commande.quantity, commande_id)
        )
        conn.commit()

        if cursor.rowcount == 0:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Commande non trouvée")

        cursor.close()
        conn.close()
        return {"message": "Commande mise à jour avec succès!"}
    
    except mysql.connector.Error as err:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erreur lors de la mise à jour de la commande: {err}")

