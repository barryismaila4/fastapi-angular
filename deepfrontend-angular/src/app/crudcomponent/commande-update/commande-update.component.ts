// commande-update.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeepCommande } from 'src/app/models/deep-commande.model';
import { DeepCommandeService } from 'src/app/services/deepcommande.service';

@Component({
  selector: 'app-commande-update',
  templateUrl: './commande-update.component.html',
  styleUrls: ['./commande-update.component.css']
})
export class CommandeUpdateComponent implements OnInit {
  commandeForm: FormGroup;
  commandeId: number = 0; // Initialisation à une valeur par défaut

  constructor(
    private fb: FormBuilder,
    private deepCommandeService: DeepCommandeService,
    private router: Router,
    private route: ActivatedRoute
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
    const idParam = this.route.snapshot.paramMap.get('id');
    this.commandeId = idParam ? +idParam : 0; // Vérification pour éviter les valeurs nulles
    this.loadCommande();
  }

  loadCommande(): void {
    this.deepCommandeService.getCommandes().subscribe({
      next: (commandes) => {
        const commande = commandes.find(c => c.id === this.commandeId);
        if (commande) {
          this.commandeForm.patchValue({
            magasin_name: commande.magasin_name,
            product_name: commande.product_name,
            quantity: commande.quantity,
            username: commande.username,
            usernumber: commande.usernumber
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la commande', err);
      }
    });
  }

  onSubmit(): void {
    if (this.commandeForm.valid) {
      const updatedCommande = new DeepCommande(
        this.commandeId,
        new Date(), // Vous pouvez ajuster cela si nécessaire
        this.commandeForm.value.magasin_name,
        this.commandeForm.value.product_name,
        this.commandeForm.value.quantity,
        this.commandeForm.value.username,
        this.commandeForm.value.usernumber
      );

      this.deepCommandeService.updateCommande(this.commandeId, updatedCommande).subscribe({
        next: () => {
          this.router.navigate(['crud/commande/list']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la commande', err);
        }
      });
    }
  }
}