import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeepService } from 'src/app/services/deep.service';
import { DeepCategory } from 'src/app/models/deep-category.model';

@Component({
  selector: 'app-frontcategory',
  templateUrl: './frontcategory.component.html',
  styleUrls: ['./frontcategory.component.css']
})
export class FrontcategoryComponent implements OnInit {
  categories: DeepCategory[] = [];

  constructor(private deepService: DeepService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
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

  // Naviguer vers la liste des magasins liés à la catégorie sélectionnée
  showMagasins(categoryId: number): void {
    this.router.navigate(['/frontoffice/frontmagasin'], { queryParams: { categoryId } });
  }
}
