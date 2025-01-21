// deepcommande.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeepCommande } from 'src/app/models/deep-commande.model';

@Injectable({
  providedIn: 'root'
})
export class DeepCommandeService {
  private apiUrl = 'http://localhost:8000'; // URL du backend FastAPI

  constructor(private http: HttpClient) {}

  // Récupérer la liste des commandes
  getCommandes(): Observable<DeepCommande[]> {
    return this.http.get<{ commandes: any[] }>(`${this.apiUrl}/getcommande`).pipe(
      map(response => {
        console.log('Données reçues du backend:', response.commandes);
        return response.commandes.map(commande => {
          return new DeepCommande(
            commande[0], // id
            new Date(commande[1]), // date_commande
            commande[2], // magasin_name (c'est une chaîne)
            commande[3], // product_name
            commande[4], // quantity
            commande[5], // username
            commande[6]  // usernumber
          );
        });
      })
    );
  }

  // Ajouter une commande
  addCommande(commande: DeepCommande): Observable<any> {
    return this.http.post(`${this.apiUrl}/addcommande`, {
      magasin_name: commande.magasin_name, // C'est maintenant une chaîne
      product_name: commande.product_name,
      quantity: commande.quantity,
      username: commande.username,
      usernumber: commande.usernumber
    });
  }

  // Supprimer une commande
  deleteCommande(commandeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletecommande/${commandeId}`);
  }

  // Mettre à jour une commande
  updateCommande(commandeId: number, commande: DeepCommande): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatecommande/${commandeId}`, commande);
  }
}