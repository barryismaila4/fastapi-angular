import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepService } from 'src/app/services/deep.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  categoryForm: FormGroup;
  successMessage: string | null = null; // Variable pour le message de succès

  constructor(
    private formBuilder: FormBuilder,
    private deepService: DeepService,
    private router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory = new DeepCategory(0, this.categoryForm.value.name); // ID à 0 pour une nouvelle catégorie
      this.deepService.addCategory(newCategory).subscribe({
        next: (response) => {
          this.successMessage = 'Catégorie ajoutée avec succès !'; // Message de succès
          console.log('Category added successfully', response);
          setTimeout(() => {
            this.router.navigate(['/crud/category/list']); // Redirige vers la liste des catégories après un délai
          }, 2000); // Délai de 2 secondes
        },
        error: (error) => {
          console.error('Error adding category', error);
        }
      });
    }
  }
}