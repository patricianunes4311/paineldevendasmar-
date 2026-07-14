// firebase-db.js
// Helper for Firebase Realtime Database + Firebase Auth.

const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

function initFirebase() {
    if (!window.firebase) {
        console.error('Firebase não foi carregado.');
        return null;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    return firebase.app();
}

function getDatabase() {
    const app = initFirebase();
    return app ? firebase.database() : null;
}

function getAuth() {
    const app = initFirebase();
    return app ? firebase.auth() : null;
}

function getDatabaseRef(path) {
    const db = getDatabase();
    return db ? db.ref(path) : null;
}

function authStateChanged(callback) {
    const auth = getAuth();
    if (!auth) return;
    auth.onAuthStateChanged(callback);
}

function signInUser(email, password) {
    const auth = getAuth();
    if (!auth) return Promise.reject(new Error('Firebase Auth não disponível.'));
    return auth.signInWithEmailAndPassword(email, password);
}

function signOutUser() {
    const auth = getAuth();
    if (!auth) return Promise.resolve();
    return auth.signOut();
}

function handleFirebaseError(error) {
    console.error('Firebase error:', error);
    return null;
}
