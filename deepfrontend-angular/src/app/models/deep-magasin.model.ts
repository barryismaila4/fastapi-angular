// deep-magasin.model.ts
import { DeepCategory } from './deep-category.model';

export class DeepMagasin {
    id: number;
    name: string;
    adresse: string;
    produit: string;
    produitdetails: string;
    produitprix: number;
    category_name: string; // Utilisation d'un string pour le nom de la catégorie

    constructor(
        id: number,
        name: string,
        adresse: string,
        produit: string,
        produitdetails: string,
        produitprix: number,
        category_name: string
    ) {
        this.id = id;
        this.name = name;
        this.adresse = adresse;
        this.produit = produit;
        this.produitdetails = produitdetails;
        this.produitprix = produitprix;
        this.category_name = category_name;
    }
}
