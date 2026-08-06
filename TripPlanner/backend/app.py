from flask import Flask, request, jsonify
from flask_cors import CORS
import db_creation as db
from sqlalchemy import insert, select, delete, update
import datetime
import jwt
import os

# Create Flask server
app = Flask(__name__)

CORS(app)

# for jwt
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

# Load tables if they don't exist yet
db.metadata_obj.create_all(db.engine)

@app.route('/testing')
def database_testing():
    with db.engine.connect() as conn:
        res = conn.execute(
            insert(db.user_table),
            [
                {"user_id": 1, "username": "bob_2", "email": "bob_kent@gmail.com", "password": "password123", "profile_pic": "img1"},
                {"user_id": 2, "username": "charlie_3", "email": "charlie_livingston@gmail.com", "password": "michaeljackson_rules", "profile_pic": "img2"},
                {"user_id": 3, "username": "ross_4", "email": "ross_lark@gmail.com", "password": "heavymetal647", "profile_pic": "img3"},
            ]
        )
        conn.commit()

    return "Database connection successful!"

@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # testing to see values
    print(email)
    print(password)
    with db.engine.connect() as conn:
        row = conn.execute(
            select(db.user_table).where(db.user_table.c.email == email)
        ).first()
        print(row)

        if (row):
            # Instantiate User obj
            User = {
                "id": row[0], 
                "email": row[2], 
                "username": row[1],
                "profile": row[4],
            }

            # jwt token payload
            payload = {
                "id": row[0],
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),
                "iat": datetime.datetime.now(datetime.timezone.utc)
            }

            # generate token
            token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
            print(token)

            return {"found": True, "user": User, "token": token}
        return {"found": False, "user": None, "token": None}

@app.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # testing
    print(email, username, password)

    with db.engine.connect() as conn:
        # check for unique username / email
        row = conn.execute(
            select(db.user_table).where((db.user_table.c.email == email) | (db.user_table.c.username == username))
        ).first()
        print(row)
        if row:
            return {"success": False, "user": None, "token": None}     

        stmt = insert(db.user_table).values(username=username, email=email, password=password, profile_pic="img1")

        result = conn.execute(stmt)
        conn.commit()

        # Instantiate User obj
        User = {
            "id": result.inserted_primary_key[0], 
            "email": email, 
            "username": username,
            "profile": "img1",
        }

        # jwt token payload
        payload = {
            "id": result.inserted_primary_key[0], 
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),
            "iat": datetime.datetime.now(datetime.timezone.utc)
        }

        # generate token
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        print(token)

        return {"success": True, "user": User, "token": token}, 200

def get_current_user(auth_header):
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    # extract token
    token = auth_header.split(" ")[1]

    try:
        # decode token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}

@app.route("/user", methods=["GET"])
def user():
    header = request.headers.get("Authorization")
    token_data = get_current_user(header)

    if not token_data or "error" in token_data:
        return jsonify({"message": token_data.get("error", "Unauthorized")}), 401

    with db.engine.connect() as conn:
        row = conn.execute(select(db.user_table).where(db.user_table.c.user_id == token_data.get("id"))).first()
    
    # if valid token, get the user info
    User = {
                "id": token_data.get("id"), 
                "email": row[2], 
                "username": row[1],
                "profile": row[4],
            }
    return User, 200

@app.route('/changeUsername', methods=["POST"])
def editUsername():
    header = request.headers.get("Authorization")
    token_data = get_current_user(header)

    data = request.get_json()
    newUsername = data.get("username")
    print(f"New user: {newUsername}")

    if not token_data or "error" in token_data:
        print("Error: no token")
        return jsonify({"message": "no token", "user": None, "token": None})

    with db.engine.connect() as conn:
        # check for unique username 
        row = conn.execute(
            select(db.user_table).where(db.user_table.c.username == newUsername)
        ).first()
        print(row)
        if row:
            return {"message": "user taken", "user": None, "token": None}  

    with db.engine.connect() as conn:
        # update username
        conn.execute(
            update(db.user_table)
            .where(db.user_table.c.user_id == token_data.get("id"))
            .values(username = newUsername)
        )
        conn.commit()
        print("Success: User updated")

        row = conn.execute(
            select(db.user_table).where(db.user_table.c.username == newUsername)
        ).first()

        User = {
            "id": token_data.get("id"),
            "email": row[2],
            "username": newUsername,
            "profile": row[4],
        }

        payload = {
            "id": token_data.get("id"), 
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),
            "iat": datetime.datetime.now(datetime.timezone.utc)
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return jsonify({"message": "changed user", "user": User, "token": token})

@app.route('/changePassword', methods=["POST"])
def editPassword():
    header = request.headers.get("Authorization")
    token_data = get_current_user(header)

    data = request.get_json()
    newPassword = data.get("password")
    print(f"New password: {newPassword}")

    if not token_data or "error" in token_data:
        print("Error: no token")
        return jsonify({"message": "no token"})

    with db.engine.connect() as conn:
        # update password
        conn.execute(
            update(db.user_table)
            .where(db.user_table.c.user_id == token_data.get("id"))
            .values(password = newPassword)
        )
        conn.commit()
        print("Success: Password updated")

        return jsonify({"message": "changed password"})

@app.route('/savePic', methods=["POST"])
def editProfilePic():
    header = request.headers.get("Authorization")
    token_data = get_current_user(header)

    data = request.get_json()
    newProfilePic = data.get("profilePic")
    print(f"New pic: {newProfilePic}")

    if not token_data or "error" in token_data:
        print("Error: no token")
        return jsonify({"message": "no token", "user": None})

    with db.engine.connect() as conn:
        # update user profile pic
        conn.execute(
            update(db.user_table)
            .where(db.user_table.c.user_id == token_data.get("id"))
            .values(profile_pic = newProfilePic)
        )
        conn.commit()
        print("Success: User profile updated")

        row = conn.execute(
            select(db.user_table).where(db.user_table.c.user_id == token_data.get("id"))
        ).first()

        User = {
            "id": token_data.get("id"),
            "email": row[2],
            "username": row[1],
            "profile": newProfilePic,
        }

        return jsonify({"message": "changed user", "user": User})

@app.route('/deleting')
def deleteUser():
    header = request.headers.get("Authorization")
    token_data = get_current_user(header)

    if not token_data or "error" in token_data:
        return jsonify({"message": token_data.get("error", "Unauthorized")}), 401

    with db.engine.connect() as conn:
        res = conn.execute(
            delete(db.user_table).where(db.user_table.c.user_id == token_data.get("id"))
        )
        conn.commit()

    return jsonify({"message": "Deleted user successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)