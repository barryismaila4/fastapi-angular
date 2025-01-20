import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudcomponentComponent } from './crudcomponent/crudcomponent.component';
import { CategoryListComponent } from './crudcomponent/category-list/category-list.component';
import { CategoryAddComponent } from './crudcomponent/category-add/category-add.component';
import { CategoryUpdateComponent } from './crudcomponent/category-update/category-update.component';
import { MagasinListComponent } from './crudcomponent/magasin-list/magasin-list.component';
import { MagasinAddComponent } from './crudcomponent/magasin-add/magasin-add.component';
import { MagasinUpdateComponent } from './crudcomponent/magasin-update/magasin-update.component';
import { CommandeListComponent } from './crudcomponent/commande-list/commande-list.component';
import { CommandeAddComponent } from './crudcomponent/commande-add/commande-add.component';
import { CommandeUpdateComponent } from './crudcomponent/commande-update/commande-update.component';

const routes: Routes = [
  {
    path: 'crud', component: CrudcomponentComponent, children: [
      { path: 'category/list', component: CategoryListComponent },
      { path: 'category/add', component: CategoryAddComponent },
      { path: 'category/update/:id', component: CategoryUpdateComponent },
      
      { path: 'magasin/list', component: MagasinListComponent },
      { path: 'magasin/add', component: MagasinAddComponent },
      { path: 'magasin/update/:id', component: MagasinUpdateComponent },

      { path: 'commande/list', component: CommandeListComponent },
      { path: 'commande/add', component: CommandeAddComponent },
      { path: 'commande/update/:id', component: CommandeUpdateComponent }
    ]
  },
  { path: '', redirectTo: '/crud/category/list', pathMatch: 'full' } // Redirection vers la liste des catégories par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
