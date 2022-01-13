from flask import Flask
from flask import request
import pandas as pd
import pickle
import numpy as np

price_model37 = pickle.load(open('price_model37.pkl', 'rb'))
app = Flask(__name__)


@app.route('/predict_price')
def predict_price():
    features_dic = {'pickup_day': request.args.get('pickup_day'),
                    'pickup_hour': request.args.get('pickup_hour'),
                    'pickup_minute': request.args.get('pickup_minute'),
                    'pickup_longitude': request.args.get('pickup_longitude'),
                    'pickup_latitude': request.args.get('pickup_latitude'),
                    'trip_distance': request.args.get('trip_distance'),
                    'dropoff_longitude': request.args.get('dropoff_longitude'),
                    'dropoff_latitude': request.args.get('dropoff_latitude'),
                    'passenger_count': request.args.get('passenger_count')
                    }

    X_new = np.fromiter(features_dic.values(), dtype=float)
    predict_me = X_new.reshape(1, -1)
    y_p = price_model37.predict(predict_me)[0]

    return f"{y_p}"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
