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
    this.router.navigate(['crud/category-add']);
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
}
