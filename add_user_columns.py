"""One-time script: add gender and number columns to user table if missing."""
import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'instance', 'spendly.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(user)")
cols = [row[1] for row in cursor.fetchall()]

if 'gender' not in cols:
    cursor.execute("ALTER TABLE user ADD COLUMN gender VARCHAR(20)")
    print("Added column: gender")
if 'number' not in cols:
    cursor.execute("ALTER TABLE user ADD COLUMN number VARCHAR(20)")
    print("Added column: number")

conn.commit()
conn.close()
print("Database updated.")
