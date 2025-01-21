// magasin-add.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';
import { DeepService } from 'src/app/services/deep.service';
import { DeepCategory } from 'src/app/models/deep-category.model';
import { DeepmagasinService } from 'src/app/services/deepmagasin.service';

@Component({
  selector: 'app-magasin-add',
  templateUrl: './magasin-add.component.html',
  styleUrls: ['./magasin-add.component.css']
})
export class MagasinAddComponent implements OnInit {
  magasinForm: FormGroup;
  successMessage: string | null = null;
  categories: DeepCategory[] = []; // Pour stocker les catégories

  constructor(
    private formBuilder: FormBuilder,
    private deepmagasinService: DeepmagasinService,
    private deepService: DeepService,
    private router: Router
  ) {
    this.magasinForm = this.formBuilder.group({
      name: ['', Validators.required],
      adresse: ['', Validators.required],
      produit: ['', Validators.required],
      produitdetails: ['', Validators.required],
      produitprix: [0, [Validators.required, Validators.min(0)]],
      category_name: ['', Validators.required] // Champ pour le nom de la catégorie
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Charger les catégories lors de l'initialisation
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

  onSubmit() {
    if (this.magasinForm.valid) {
      const newMagasin = new DeepMagasin(
        0,
        this.magasinForm.value.name,
        this.magasinForm.value.adresse,
        this.magasinForm.value.produit,
        this.magasinForm.value.produitdetails,
        this.magasinForm.value.produitprix,
        this.magasinForm.value.category_name // Utiliser le nom de la catégorie sélectionnée
      );
      this.deepmagasinService.addMagasin(newMagasin).subscribe({
        next: (response) => {
          this.successMessage = 'Magasin ajouté avec succès !';
          console.log('Magasin ajouté avec succès', response);
          setTimeout(() => {
            this.router.navigate(['/crud/magasin/list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du magasin', error);
        }
      });
    }
  }
}