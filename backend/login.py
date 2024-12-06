from flask import Blueprint, request, jsonify
import jwt
import datetime
from database import get_db

# Secret key for JWT
SECRET_KEY = "your_jwt_secret_key"
REFRESH_SECRET_KEY = "your_refresh_jwt_secret_key"

login_bp = Blueprint('login', __name__)

# Helper function to generate tokens
def generate_tokens(user_id, username, contact, role):
    # Generate Access Token
    access_token = jwt.encode({
        'id': user_id,
        'username': username,
        'contact': contact,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # 1 hour expiration
    }, SECRET_KEY, algorithm="HS256")

    # Generate Refresh Token
    refresh_token = jwt.encode({
        'id': user_id,
        'username': username,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)  # 7 days expiration
    }, REFRESH_SECRET_KEY, algorithm="HS256")

    return access_token, refresh_token

# Tenant Login API
@login_bp.route('/tenant-login', methods=['POST'])
def tenant_login():
    db = get_db()
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Query to check tenant credentials in the `users` table
    cursor = db.cursor()
    cursor.execute(
        "SELECT id_user, username, contact FROM users WHERE username=%s AND password=%s",
        (username, password)
    )
    tenant = cursor.fetchone()

    if tenant:
        # Generate Access and Refresh Tokens
        access_token, refresh_token = generate_tokens(tenant[0], tenant[1], tenant[2], 'tenant')

        return jsonify({
            'message': 'Tenant login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id_user': tenant[0],
                'username': tenant[1],
                'contact': tenant[2],
                'role': 'tenant'
            }
        }), 200
    else:
        return jsonify({'message': 'Invalid tenant credentials'}), 401


# Owner Login API
@login_bp.route('/owner-login', methods=['POST'])
def owner_login():
    db = get_db()
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Query to check owner credentials in the `owners` table
    cursor = db.cursor()
    cursor.execute(
        "SELECT id_owner, username, contact FROM owners WHERE username=%s AND password=%s",
        (username, password)
    )
    owner = cursor.fetchone()

    if owner:
        # Generate Access and Refresh Tokens
        access_token, refresh_token = generate_tokens(owner[0], owner[1], owner[2], 'owner')

        return jsonify({
            'message': 'Owner login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id_owner': owner[0],
                'username': owner[1],
                'contact': owner[2],
                'role': 'owner'
            }
        }), 200
    else:
        return jsonify({'message': 'Invalid owner credentials'}), 401


# Refresh Token API
@login_bp.route('/refresh', methods=['POST'])
def refresh_token():
    data = request.json
    refresh_token = data.get('refresh_token')

    try:
        # Decode Refresh Token
        decoded = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=["HS256"])

        # Generate a new Access Token
        new_access_token = jwt.encode({
            'id': decoded['id'],
            'username': decoded['username'],
            'role': decoded['role'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            'message': 'Token refreshed successfully',
            'access_token': new_access_token
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Refresh token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid refresh token'}), 401
