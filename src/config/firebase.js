import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCcoLHER4XEwrHLQwUmVgIu37_sl0mkDa4",
  authDomain: "whatsapp-clone-8190.firebaseapp.com",
  projectId: "whatsapp-clone-8190",
  storageBucket: "whatsapp-clone-8190.appspot.com",
  messagingSenderId: "774988251055",
  appId: "1:774988251055:web:c611451a81473482db395a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default db
