from flask import Flask
from flask_cors import CORS
import db_creation
from sqlalchemy import insert

# Create Flask server
app = Flask(__name__)
CORS(app)

# Load tables if they don't exist yet
db_creation.metadata_obj.create_all(db_creation.engine)

@app.route('/testing')
def database_testing():
    with db_creation.engine.connect() as conn:
        res = conn.execute(
            insert(db_creation.user_table),
            [
                {"user_id": 1, "username": "bob_2", "email": "bob_kent@gmail.com", "password": "password123", "profile_pic": "src/images/img1.png"},
                {"user_id": 2, "username": "charlie_3", "email": "charlie_livingston@gmail.com", "password": "michaeljackson_rules", "profile_pic": "src/images/img2.png"},
                {"user_id": 3, "username": "ross_4", "email": "ross_lark@gmail.com", "password": "heavymetal647", "profile_pic": "src/images/img3.png"},
            ]
        )
        conn.commit()

    return "Database connection successful!"

if __name__ == "__main__":
    app.run(debug=True)