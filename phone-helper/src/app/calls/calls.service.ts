import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Campaign, Question } from '../campaign/campaign'
import { callItem, CallItem } from './call'

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private ItemCollection: AngularFirestoreCollection<CallItem>;

  constructor(private firestore: AngularFirestore) { }


  // add a new campaign to Firestore database collection
   addItem(item:CallItem) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const itemObject = {...item};
    const ref =  this.firestore.collection('workSpace/'+item.workspaceID + '/logs').add(itemObject)
    return ref
  }

  // this method returns list of campaigns document,
  // fetched from Firestore database collection
  getAllItems(workspaceID:string,campaignID:string) {
    this.ItemCollection = this.firestore.collection<callItem>('workSpace/' + workspaceID + '/logs', ref => ref.where('campaignID', '==', campaignID));
    return this.ItemCollection.snapshotChanges()
  }

  getCustomerItems(workspaceID:string,campaignID:string,customerID:string) {
    this.ItemCollection = this.firestore.collection<callItem>('workSpace/' + workspaceID + '/logs', ref => ref
    .where('campaignID', '==', campaignID)
    .where('customerID', '==', customerID)
    .orderBy('date','asc'));
    return this.ItemCollection.snapshotChanges()
  }

  getUserItems(workspaceID:string,campaignID:string,userID:string) {
    this.ItemCollection = this.firestore.collection<callItem>('workSpace/' + workspaceID + '/logs', ref => ref.where('campaignID', '==', campaignID)
    .where('userID', '==', userID));
    return this.ItemCollection.snapshotChanges()
  }


  getItem(logID: string,workspaceID:string): any  {
    return this.firestore.collection<Campaign>('workSpace/' + workspaceID + '/logs/'  ).doc(logID).snapshotChanges();
  }
        




}




  
