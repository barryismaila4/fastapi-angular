import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Ajout de HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';      // Ajout de ReactiveFormsModule
import { FormsModule } from '@angular/forms';               // Ajout de FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudcomponentComponent } from './crudcomponent/crudcomponent.component';
import { CategoryListComponent } from './crudcomponent/category-list/category-list.component';
import { CategoryAddComponent } from './crudcomponent/category-add/category-add.component';
import { CategoryUpdateComponent } from './crudcomponent/category-update/category-update.component';

import { CommandeListComponent } from './crudcomponent/commande-list/commande-list.component';
import { CommandeAddComponent } from './crudcomponent/commande-add/commande-add.component';
import { CommandeUpdateComponent } from './crudcomponent/commande-update/commande-update.component';
import { AllTemplateBackComponent } from './crudcomponent/all-template-back/all-template-back.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { FrontcategoryComponent } from './frontoffice/frontcategory/frontcategory.component';
import { FrontmagasinComponent } from './frontoffice/frontmagasin/frontmagasin.component';
import { FrontcommandeComponent } from './frontoffice/frontcommande/frontcommande.component';
import { MagasinAddComponent } from './crudcomponent/magasin-add/magasin-add.component';
import { MagasinListComponent } from './crudcomponent/magasin-list/magasin-list.component';
import { MagasinUpdateComponent } from './crudcomponent/magasin-update/magasin-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudcomponentComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    MagasinListComponent,
    MagasinAddComponent,
    MagasinUpdateComponent,
    CommandeListComponent,
    CommandeAddComponent,
    CommandeUpdateComponent,
    AllTemplateBackComponent,
    FrontofficeComponent,
    FrontcategoryComponent,
    FrontmagasinComponent,
    FrontcommandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,        // Ajouté à imports
    ReactiveFormsModule,     // Ajouté à imports
    FormsModule              // Ajouté à imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
