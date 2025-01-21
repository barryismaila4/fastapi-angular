import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepService } from 'src/app/services/deep.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: DeepCategory[] = [];
  searchTerm: string = ''; // Variable pour stocker la chaîne de recherche

  constructor(private deepService: DeepService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.deepService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Catégories récupérées:', this.categories); // Vérification des données récupérées
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories', err);
      }
    });
  }

  addCategory(): void {
    this.router.navigate(['crud/category/add']);
  }

  deleteCategory(id: number): void {
    if (id !== null && confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.deepService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories(); // Recharger la liste après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la catégorie', err);
        }
      });
    }
  }

  editCategory(id: number): void {
    if (id !== null) {
      this.router.navigate(['crud/category/update', id]);
    }
  }

  // Méthode pour filtrer les catégories en fonction de la chaîne de recherche
  filteredCategories(): DeepCategory[] {
    if (!this.searchTerm) {
      return this.categories; // Si aucune recherche, retourner toutes les catégories
    }
    return this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Méthode pour gérer la recherche (facultatif, car le filtrage se fait déjà dans le template)
  searchCategory(): void {
    // Vous pouvez ajouter une logique supplémentaire ici si nécessaire
  }
}