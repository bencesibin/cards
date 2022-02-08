from ast import If
from flask import Flask
import random

app = Flask(__name__)


@app.route("/cards")
def cards():
    secure_random = random.sample(range(4),3)
    return {"cards": {"set": secure_random}}


if __name__ == "__main__":
    app.run(debug=True)



