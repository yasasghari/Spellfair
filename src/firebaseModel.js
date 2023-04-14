import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import DeckModel from "./DeckModel.js"
import {confirmPasswordReset, getAuth} from "firebase/auth"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { vModelRadio } from "vue";

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase);
const auth = getAuth(firebase); 

const REF = "dinnerModel200";

function observerRecap(model) {
  model.addObserver(function (payload) {
  });
}

function updateFirebaseFromModel(model) {
    if(model.uid === '-1') return;
    const db = getDatabase();
    function observerCB(payload){
       
        if(payload.userID){
            set(ref(db, "USERS/" + payload.userID + "/id"), payload.userID)
        }

        if(payload.userEmail){
            set(ref(db,"USERS/"+model.uid+"/email"),payload.userEmail)
        }


        if(payload.userDeckList){
            set(ref(db,"USERS/"+model.uid+"/decklist"),payload.userDeckList)
        }

        if(payload.changeTitle){
            set(ref(db,"USERS/"+model.uid+"/title"),payload.changeTitle)
        }
        
        if(payload && payload.changeCommander){
            set(ref(db,"USERS/"+model.uid+"/commander"),payload.changeCommander)
        }
      
    }

    model.addObserver(observerCB);

return;


}

function updateModelFromFirebase(model) {
    const db = getDatabase();
    onValue(ref(db,"USERS/"+model.uid+"/title"),
    function (data) {
      if (data.val()) model.title = data.val(); //model.changeName(data.val()) 
    });
    onValue(ref(db,"USERS/"+model.uid+"/commander"),
     function (data) {
        if (data.val()) model.setCommander(data.val()); //model.changeName(data.val()) 
    });
    onValue(ref(db,"USERS/"+model.uid+"/decklist"), 
    function (data) {
      if (data.val()) 
        model.databaseImport(data.val());
    })
}

export {
  updateFirebaseFromModel,
  updateModelFromFirebase,
  observerRecap,
  auth, 
};


