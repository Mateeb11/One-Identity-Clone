import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ADAccountInterface } from '../models/adAccount.interface';

@Injectable({
  providedIn: 'root'
})
export class ActiveDirectoryService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCollection() {
    return this.angularFirestore.collection('ADSAccount').snapshotChanges();
  }

}
