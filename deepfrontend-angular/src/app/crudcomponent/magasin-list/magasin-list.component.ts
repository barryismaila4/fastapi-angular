import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';
import { DeepmagasinService } from 'src/app/services/deepmagasin.service';
import { DeepService } from 'src/app/services/deep.service';
import { DeepCategory } from 'src/app/models/deep-category.model';

@Component({
  selector: 'app-magasin-list',
  templateUrl: './magasin-list.component.html',
  styleUrls: ['./magasin-list.component.css']
})
export class MagasinListComponent implements OnInit {
  magasins: DeepMagasin[] = [];
  categories: DeepCategory[] = []; // Pour stocker les catégories
  searchTerm: string = ''; // Variable pour stocker la chaîne de recherche

  constructor(private deepmagasinService: DeepmagasinService, private deepService: DeepService, private router: Router) {}

  ngOnInit(): void {
    this.loadMagasins();
    this.loadCategories(); // Charger les catégories pour les utiliser si nécessaire
  }

  loadMagasins(): void {
    this.deepmagasinService.getMagasins().subscribe({
      next: (data) => {
        this.magasins = data;
        console.log('Magasins récupérés:', this.magasins);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des magasins', err);
      }
    });
  }

  loadCategories(): void {
    this.deepService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories', err);
      }
    });
  }

  addMagasin(): void {
    this.router.navigate(['crud/magasin/add']);
  }

  deleteMagasin(id: number): void {
    if (id !== null && confirm('Êtes-vous sûr de vouloir supprimer ce magasin ?')) {
      this.deepmagasinService.deleteMagasin(id).subscribe({
        next: () => {
          this.loadMagasins(); // Recharger la liste après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du magasin', err);
        }
      });
    }
  }

  editMagasin(id: number): void {
    if (id !== null) {
      this.router.navigate(['crud/magasin/update', id]);
    }
  }

  // Méthode pour filtrer les magasins en fonction de la chaîne de recherche
  filteredMagasins(): DeepMagasin[] {
    if (!this.searchTerm) {
      return this.magasins; // Si aucune recherche, retourner tous les magasins
    }
    return this.magasins.filter(magasin => 
      magasin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Méthode pour gérer la recherche (facultatif, car le filtrage se fait déjà dans le template)
  searchMagasin(): void {
    // Vous pouvez ajouter une logique supplémentaire ici si nécessaire
  }
}