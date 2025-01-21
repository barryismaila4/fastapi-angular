// magasin-update.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';
import { DeepmagasinService } from 'src/app/services/deepmagasin.service';
import { DeepService } from 'src/app/services/deep.service';
import { DeepCategory } from 'src/app/models/deep-category.model';

@Component({
  selector: 'app-magasin-update',
  templateUrl: './magasin-update.component.html',
  styleUrls: ['./magasin-update.component.css']
})
export class MagasinUpdateComponent implements OnInit {
  magasinId: number | undefined;
  magasin: DeepMagasin = new DeepMagasin(0, '', '', '', '', 0, ''); // Valeur par défaut
  categories: DeepCategory[] = []; // Pour stocker les catégories

  constructor(
    private route: ActivatedRoute,
    private deepmagasinService: DeepmagasinService,
    private deepService: DeepService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.magasinId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMagasin();
    this.loadCategories(); // Charger les catégories lors de l'initialisation
  }

  loadMagasin(): void {
    this.deepmagasinService.getMagasins().subscribe({
      next: (data) => {
        const magasinToEdit = data.find((magasin) => magasin.id === this.magasinId);
        if (magasinToEdit) {
          this.magasin = magasinToEdit;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du magasin', err);
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

  updateMagasin(): void {
    if (this.magasinId !== undefined) {
      this.deepmagasinService.updateMagasin(this.magasinId, this.magasin).subscribe({
        next: () => {
          this.router.navigate(['crud/magasin/list']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du magasin', err);
        }
      });
    }
  }
}