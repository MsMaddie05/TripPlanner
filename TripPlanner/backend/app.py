from flask import Flask, request, jsonify
from flask_cors import CORS
import db_creation as db
from sqlalchemy import insert, select

# Create Flask server
app = Flask(__name__)
CORS(app)

# Load tables if they don't exist yet
db.metadata_obj.create_all(db.engine)

@app.route('/testing')
def database_testing():
    with db.engine.connect() as conn:
        res = conn.execute(
            insert(db.user_table),
            [
                {"user_id": 1, "username": "bob_2", "email": "bob_kent@gmail.com", "password": "password123", "profile_pic": "src/images/img1.png"},
                {"user_id": 2, "username": "charlie_3", "email": "charlie_livingston@gmail.com", "password": "michaeljackson_rules", "profile_pic": "src/images/img2.png"},
                {"user_id": 3, "username": "ross_4", "email": "ross_lark@gmail.com", "password": "heavymetal647", "profile_pic": "src/images/img3.png"},
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

        # Instantiate User obj
        User = {
            "id": row[0], 
            "email": row[2], 
            "username": row[1],
        }

        if (row):
            return {"found": True, "user": User}
        return {"found": False, "user": null}

if __name__ == "__main__":
    app.run(debug=True)