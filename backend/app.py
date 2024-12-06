from flask import Flask
from flask_cors import CORS  # Import CORS
from login import login_bp

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Register the login blueprint
app.register_blueprint(login_bp)

@app.route('/')
def index():
    return "Welcome to the Flask App!"

if __name__ == '__main__':
    app.run(debug=True)
