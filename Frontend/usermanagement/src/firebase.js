import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBM1eqFfmyeUD9WddcO38c4HmlmJQE8_SE",
    authDomain: "mernstackpractical.firebaseapp.com",
    projectId: "mernstackpractical",
    storageBucket: "mernstackpractical.appspot.com",
    messagingSenderId: "430396031893",
    appId: "1:430396031893:web:fc41dcbd09075e2e0aac9c",
    measurementId: "G-NGM99K6RFR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
