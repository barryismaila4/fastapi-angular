import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';
import { DeepCategory } from 'src/app/models/deep-category.model';

@Injectable({
  providedIn: 'root'
})
export class DeepmagasinService {
  private apiUrl = 'http://localhost:8000'; // URL du backend FastAPI

  constructor(private http: HttpClient) {}

  // =================== DeepMagasin =====================

  // Récupérer la liste des magasins
  getMagasins(): Observable<DeepMagasin[]> {
    return this.http.get<{ magasins: any[] }>(`${this.apiUrl}/getmagasin`).pipe(
      map(response => {
        // Transformer les tuples en objets DeepMagasin
        return response.magasins.map(magasin => new DeepMagasin(
          magasin[0], // id
          magasin[1], // name
          magasin[2], // adresse
          magasin[3], // produit
          magasin[4], // produitdetails
          magasin[5], // produitprix
          magasin[6]  // category_name
        ));
      })
    );
  }

  // Ajouter un magasin
  addMagasin(magasin: DeepMagasin): Observable<any> {
    return this.http.post(`${this.apiUrl}/addmagasin`, magasin);
  }

  // Supprimer un magasin
  deleteMagasin(magasinId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletemagasin/${magasinId}`);
  }

  // Mettre à jour un magasin
  updateMagasin(magasinId: number, magasin: DeepMagasin): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatemagasin/${magasinId}`, magasin);
  }
  getMagasinsByCategory(categoryId: string): Observable<DeepMagasin[]> {
    const url = `${this.apiUrl}/getmagasin/category/${categoryId}`;
    console.log("Requête envoyée à l'URL : ", url);  // Ajout du log pour vérifier l'URL
    return this.http.get<{ magasins: any[] }>(url).pipe(
      map(response => {
        return response.magasins.map(magasin => new DeepMagasin(
          magasin.id,
          magasin.name,
          magasin.adresse,
          magasin.produit,
          magasin.produitdetails,
          magasin.produitprix,
          magasin.category_name
        ));
      })
    );
  }
  
  
  
}