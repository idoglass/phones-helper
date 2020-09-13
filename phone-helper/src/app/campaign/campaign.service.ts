import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Campaign, Question } from './campaign'
import { UsersService } from '../users/users.service';
import { WorkSpace } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignCollection: AngularFirestoreCollection<Campaign>;
  private questionCollection: AngularFirestoreCollection<Question>;

  constructor(private firestore: AngularFirestore,usersService:UsersService) { }

  // this method takes an campaign object and 
  // add a new campaign to Firestore database collection
  async addCampaign(campaign: Campaign, workspace:string) {
    // convert object of type Employee to JSON object
    // because Firestore understand JSON
    const campaignObject = {...campaign};
    const ref = await this.firestore.collection('workSpace/'+workspace+'/Campaigns').add(campaignObject).then(ref => {
      return  ref.id
    });
    return ref
  }
  // this method returns list of campaigns document,
  // fetched from Firestore database collection
  getCampaigns(workSpace:WorkSpace) {
    console.log(workSpace,"test")
    this.campaignCollection = this.firestore.collection<Campaign>('workSpace/' + workSpace.id + '/Campaigns', ref => ref.where('isActive', '==', true));
    return this.campaignCollection.snapshotChanges()
  }

  getQustions(workSpace:WorkSpace,campaignID: string) {
    console.log('workSpace/' + workSpace.id + '/Campaigns/' + campaignID + '/questions' )
 
    this.questionCollection = this.firestore.collection<Question>('workSpace/' + workSpace.id + '/Campaigns/' + campaignID + '/questions' );
    return this.questionCollection.snapshotChanges()
  }

  getCampaign(campaignID: string,workSpaceID:string): any  {
    return this.firestore.collection<Campaign>('workSpace/' + workSpaceID + '/Campaigns/').doc(campaignID).snapshotChanges();
  }
        

   // this method takes an campaign object and
  // update an object of campaign to the Firestore document
  updateCampaign(campaign: Campaign, workspace:string) {
    // convert object of type Campaign to JSON object
    // because Firestore understand JSON
    const campaignObject = {...campaign};
    this.firestore.doc('workSpace/'+ workspace +'/Campaigns/' + campaign.id).update(campaignObject);
  }

  // this method takes an campaign Id and
  // delete an employee document from the Firestore collection
  deleteCampaign(campaignID: string) {
    this.firestore.doc('Campaigns/' + campaignID).delete();
  }


  }
