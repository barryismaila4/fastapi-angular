// deep-commande.model.ts
export class DeepCommande {
    id: number;
    date_commande: Date;
    magasin_name: string; // Doit être une chaîne
    product_name: string;
    quantity: number;
    username: string;
    usernumber: string;

    constructor(
        id: number,
        date_commande: Date,
        magasin_name: string, // Doit être une chaîne
        product_name: string,
        quantity: number,
        username: string,
        usernumber: string
    ) {
        this.id = id;
        this.date_commande = date_commande;
        this.magasin_name = magasin_name; // C'est maintenant une chaîne
        this.product_name = product_name;
        this.quantity = quantity;
        this.username = username;
        this.usernumber = usernumber;
    }
}