// commande-add.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeepCommande } from 'src/app/models/deep-commande.model';
import { DeepCommandeService } from 'src/app/services/deepcommande.service';
import { DeepmagasinService } from 'src/app/services/deepmagasin.service';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';

@Component({
  selector: 'app-commande-add',
  templateUrl: './commande-add.component.html',
  styleUrls: ['./commande-add.component.css']
})
export class CommandeAddComponent implements OnInit {
  commandeForm: FormGroup;
  magasins: DeepMagasin[] = []; // Liste des magasins

  constructor(
    private fb: FormBuilder,
    private deepCommandeService: DeepCommandeService,
    private deepMagasinService: DeepmagasinService,
    private router: Router
  ) {
    this.commandeForm = this.fb.group({
      magasin_name: ['', Validators.required],
      product_name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      username: ['', Validators.required],
      usernumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMagasins(); // Charger la liste des magasins
  }

  loadMagasins(): void {
    this.deepMagasinService.getMagasins().subscribe({
      next: (data) => {
        this.magasins = data; // Assurez-vous que les données sont au format attendu
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des magasins', err);
      }
    });
  }

  onSubmit(): void {
    if (this.commandeForm.valid) {
      const newCommande = new DeepCommande(
        0, // ID à 0 pour une nouvelle commande
        new Date(), // Date de commande actuelle
        this.commandeForm.value.magasin_name, // Utilisation de la chaîne pour magasin_name
        this.commandeForm.value.product_name,
        this.commandeForm.value.quantity,
        this.commandeForm.value.username,
        this.commandeForm.value.usernumber
      );

      this.deepCommandeService.addCommande(newCommande).subscribe({
        next: () => {
          this.router.navigate(['crud/commande/list']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la commande', err);
        }
      });
    }
  }
}