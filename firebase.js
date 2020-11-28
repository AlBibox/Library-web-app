let firebaseConfig = {
    apiKey: "AIzaSyB4PycaDC6ZdBj_iJKThe0UMHwsLi6YQhM",
    authDomain: "library-2452b.firebaseapp.com",
    databaseURL: "https://library-2452b.firebaseio.com",
    projectId: "library-2452b",
    storageBucket: "library-2452b.appspot.com",
    messagingSenderId: "1081675913536",
    appId: "1:1081675913536:web:e22dc9d66ab6064fa442a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let database = firebase.database();

//root ref
let dbRef = database.ref();




