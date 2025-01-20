// deep-commande.model.ts
import { DeepMagasin } from './deep-magasin.model';

export class DeepCommande {
    id: number;
    date_commande: Date;
    magasin_name: DeepMagasin; // Utilisation de DeepMagasin pour représenter la relation
    product_name: string;
    quantity: number;

    constructor(
        id: number,
        date_commande: Date,
        magasin_name: DeepMagasin,
        product_name: string,
        quantity: number
    ) {
        this.id = id;
        this.date_commande = date_commande;
        this.magasin_name = magasin_name;
        this.product_name = product_name;
        this.quantity = quantity;
    }
}