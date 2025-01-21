// commande-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeepCommande } from 'src/app/models/deep-commande.model';
import { DeepCommandeService } from 'src/app/services/deepcommande.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: DeepCommande[] = [];

  constructor(private deepCommandeService: DeepCommandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.deepCommandeService.getCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        console.log('Commandes récupérées:', this.commandes);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes', err);
      }
    });
  }

  addCommande(): void {
    this.router.navigate(['crud/commande/add']);
  }

  deleteCommande(id: number): void {
    if (id !== null && confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.deepCommandeService.deleteCommande(id).subscribe({
        next: () => {
          this.loadCommandes(); // Recharger la liste après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la commande', err);
        }
      });
    }
  }

  editCommande(id: number): void {
    if (id !== null) {
      this.router.navigate(['crud/commande/update', id]);
    }
  }
}