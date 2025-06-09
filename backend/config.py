import firebase_admin
from firebase_admin import credentials, firestore
import os

FIREBASE_CREDENTIAL_PATH = os.getenv(
    "FIREBASE_CREDENTIAL_PATH", "./project/firebase/firebase-adminsdk.json"
)


def initialize_firebase():
    if not firebase_admin._apps:  # Check if Firebase has not been initialized
        try:
            cred = credentials.Certificate(FIREBASE_CREDENTIAL_PATH)
            firebase = firebase_admin.initialize_app(cred)
            firestoreDB = firestore.client()
        except Exception as e:
            print("Firebase initialization error:", e)
            firebase = None
            firestoreDB = None
    else:
        firebase = firebase_admin.get_app()
        firestoreDB = firestore.client()

    return firebase, firestoreDB
