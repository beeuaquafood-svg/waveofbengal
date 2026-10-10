import os
import firebase_admin
from firebase_admin import credentials, auth, firestore
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
try:
    cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'firebase-credentials.json')
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        print("Warning: firebase-credentials.json not found. Firebase Admin SDK not initialized.")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")

security = HTTPBearer()

def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    FastAPI dependency to verify a Firebase ID token.
    Extracts the Bearer token from the Authorization header and verifies it via Firebase Admin.
    """
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_admin(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    FastAPI dependency that verifies the Firebase ID token AND checks that
    the user has 'admin' role in the Firestore 'users' collection.
    Use this to protect admin-only API endpoints.
    """
    decoded_token = verify_firebase_token(credentials)
    uid = decoded_token.get('uid')

    try:
        db = firestore.client()
        user_doc = db.collection('users').document(uid).get()

        if not user_doc.exists:
            raise HTTPException(
                status_code=403,
                detail="User profile not found. Access denied.",
            )

        user_data = user_doc.to_dict()
        if user_data.get('role') != 'admin':
            raise HTTPException(
                status_code=403,
                detail="Insufficient permissions. Admin role required.",
            )

        return decoded_token

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error verifying admin role: {str(e)}",
        )
