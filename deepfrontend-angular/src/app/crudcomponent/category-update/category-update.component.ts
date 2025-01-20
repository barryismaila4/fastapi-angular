import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepService } from 'src/app/services/deep.service';


@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  categoryId: number | undefined;  // Déclaration comme optionnelle
  category: DeepCategory = new DeepCategory(0, ''); // Valeur par défaut pour éviter une erreur si aucune donnée n'est récupérée

  constructor(
    private route: ActivatedRoute,
    private deepService: DeepService,
    public router: Router // Exposer `router` pour l'utiliser dans le template
  ) {}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!; // Récupère l'ID depuis l'URL
    this.loadCategory();
  }

  loadCategory(): void {
    this.deepService.getCategories().subscribe({
      next: (data) => {
        const categoryToEdit = data.find((category) => category.id === this.categoryId);
        if (categoryToEdit) {
          this.category = categoryToEdit;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la catégorie', err);
      }
    });
  }

  updateCategory(): void {
    if (this.categoryId !== undefined) {
      this.deepService.updateCategory(this.categoryId, this.category).subscribe({
        next: () => {
          this.router.navigate(['crud/category/list']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la catégorie', err);
        }
      });
    }
  }
}