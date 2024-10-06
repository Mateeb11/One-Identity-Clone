import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActiveDirectoryService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCollection() {
    return this.angularFirestore.collection('ADSAccount').snapshotChanges();
  }

}
