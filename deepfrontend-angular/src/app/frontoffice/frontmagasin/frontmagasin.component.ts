import { Component, OnInit } from '@angular/core';
import { DeepmagasinService } from 'src/app/services/deepmagasin.service';  // Assurez-vous que le chemin est correct
import { DeepMagasin } from 'src/app/models/deep-magasin.model';  // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-frontmagasin',
  templateUrl: './frontmagasin.component.html',
  styleUrls: ['./frontmagasin.component.css']
})
export class FrontmagasinComponent implements OnInit {
  magasins: DeepMagasin[] = [];  // Liste des magasins récupérés
  errorMessage: string = '';      // Message d'erreur en cas de problème

  constructor(private deepmagasinService: DeepmagasinService) { }

  ngOnInit(): void {
    // Par exemple, charger les magasins de la catégorie "Ordinateurs"
    this.loadMagasinsByCategory('Ordinateurs');
  }

  // Fonction pour charger les magasins par catégorie
  loadMagasinsByCategory(categoryId: string): void {
    this.deepmagasinService.getMagasinsByCategory(categoryId).subscribe(
      (magasins: DeepMagasin[]) => {
        this.magasins = magasins;  // Stocke les magasins récupérés
        console.log('Magasins récupérés :', magasins);  // Pour vérifier dans la console
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des magasins : ' + error.message;
        console.error('Erreur HTTP :', error);
      }
    );
  }
}
