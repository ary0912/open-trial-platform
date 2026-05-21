import random
import requests

for i in range(1000):

    data = {
        "study_id": 1,
        "age": random.randint(18,80),
        "gender": random.choice(["M","F"]),
        "health_conditions": "None"
    }

    requests.post("http://127.0.0.1:8000/participants", json=data)