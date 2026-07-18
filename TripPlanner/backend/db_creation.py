from sqlalchemy import create_engine
from sqlalchemy import MetaData
from sqlalchemy import Table, Column, ForeignKey, Integer, String, Boolean, Date, JSON

# Create a database engine
engine = create_engine('sqlite:///trip_planner.db')

# Create metaData obj
metadata_obj = MetaData()

# Create table structure
user_table = Table(
    "users",
    metadata_obj,
    Column("user_id", Integer, primary_key = True),
    Column("username", String(20)),
    Column("email", String(20)),
    Column("password", String(30)),
    Column("profile_pic", String(15)),
)

trips_table = Table(
    "trips",
    metadata_obj,
    Column("trip_id", Integer, primary_key = True),
    Column("user_id", ForeignKey("users.user_id"), nullable = False),
    Column("city", String(30)),
    Column("state", String(30)),
    Column("country", String(30)),
    Column("start_date", Date),
    Column("end_date", Date),
    Column("budget", Integer),
    Column("json_file", JSON),
    Column("public_key", Boolean),
)

likes_table = Table(
    "likes",
    metadata_obj,
    Column("user_id", ForeignKey("users.user_id"), nullable = False),
    Column("trip_id", ForeignKey("trips.trip_id"), nullable = False),
)


