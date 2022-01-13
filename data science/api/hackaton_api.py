from flask import Flask
from flask import request
import pandas as pd
import pickle
import numpy as np
import xgboost as xgb

price_model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators = 100)
price_model.load_model('price_model37.json')
app = Flask(__name__)


@app.route('/predict_price')
def predict_price():
    features_dic = {'pickup_day': request.args.get('pickup_day'),
                    'pickup_hour': request.args.get('pickup_hour'),
                    'pickup_minute': request.args.get('pickup_minute'),
                    'passenger_count': request.args.get('passenger_count'),
                    'trip_distance': request.args.get('trip_distance'),
                    'pickup_longitude': request.args.get('pickup_longitude'),
                    'pickup_latitude': request.args.get('pickup_latitude'),
                    'dropoff_longitude': request.args.get('dropoff_longitude'),
                    'dropoff_latitude': request.args.get('dropoff_latitude'),
                    }

    X_new = np.fromiter(features_dic.values(), dtype=float)
    predict_me = X_new.reshape(1, -1)
    y_p = price_model.predict(predict_me)[0]

    return f"{y_p}"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
