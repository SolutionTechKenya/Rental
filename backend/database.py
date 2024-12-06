import mysql.connector

def get_db():
    # Create and return a persistent database connection
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='rentals'
    )
    return conn
