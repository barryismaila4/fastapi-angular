import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeepMagasin } from 'src/app/models/deep-magasin.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private magasinsSubject = new BehaviorSubject<DeepMagasin[]>([]);
  magasins$ = this.magasinsSubject.asObservable();

  updateMagasins(magasins: DeepMagasin[]): void {
    this.magasinsSubject.next(magasins);
  }
}