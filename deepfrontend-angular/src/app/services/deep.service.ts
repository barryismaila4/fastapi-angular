import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeepCategory } from '../models/deep-category.model';
import { DeepMagasin } from '../models/deep-magasin.model';
import { DeepCommande } from '../models/deep-commande.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeepService {
  private apiUrl = 'http://localhost:8000'; // URL du backend FastAPI

  constructor(private http: HttpClient) {}

  // =================== DeepCategory =====================

  getCategories(): Observable<DeepCategory[]> {
    return this.http.get<{ categories: [number, string][] }>(`${this.apiUrl}/getcategory`).pipe(
      map(response => {
        // Transformation du tableau de tableaux en objets DeepCategory
        return response.categories.map(category => new DeepCategory(category[0], category[1]));
      })
    );
  }

  addCategory(category: DeepCategory): Observable<any> {
    return this.http.post(`${this.apiUrl}/addcategory`, category);
  }

  updateCategory(categoryId: number, category: DeepCategory): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatecategory/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletecategory/${categoryId}`);
  }

 
}
