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
    # features_dic = {'pickup_day': request.args.get('pickup_day'),
    #                 'pickup_hour': request.args.get('pickup_hour'),
    #                 'pickup_minute': request.args.get('pickup_minute'),
    #                 'passenger_count': request.args.get('passenger_count'),
    #                 'trip_distance': request.args.get('trip_distance'),
    #                 'pickup_longitude1': request.args.get('pickup_longitude1'),
    #                 'pickup_latitude1': request.args.get('pickup_latitude1'),
    #                 'dropoff_longitude1': request.args.get('dropoff_longitude1'),
    #                 'dropoff_latitude1': request.args.get('dropoff_latitude1'),
    #                 'pickup_longitude2': request.args.get('pickup_longitude2'),
    #                 'pickup_latitude2': request.args.get('pickup_latitude2'),
    #                 'dropoff_longitude2': request.args.get('dropoff_longitude2'),
    #                 'dropoff_latitude2': request.args.get('dropoff_latitude2')
    #                 }

    pickup_day = request.args.get('pickup_day')
    pickup_hour = request.args.get('pickup_hour')
    pickup_minute = request.args.get('pickup_minute')

    passenger_count = request.args.get('passenger_count')
    trip_distance = request.args.get('trip_distance')

    pickup_longitude1 = request.args.get('pickup_longitude1')
    pickup_latitude1 = request.args.get('pickup_latitude1')
    pickup_longitude2 = request.args.get('pickup_longitude2')
    pickup_latitude2 = request.args.get('pickup_latitude2')

    dropoff_longitude1 = request.args.get('dropoff_longitude1')
    dropoff_latitude1 = request.args.get('dropoff_latitude1')
    dropoff_longitude2 = request.args.get('dropoff_longitude2')
    dropoff_latitude2 = request.args.get('dropoff_latitude2')

    pickup_route = np.array(pickup_day, pickup_hour, pickup_minute, 1, trip_distance,
                    pickup_longitude1, pickup_latitude1, pickup_longitude2, pickup_latitude2)

    dropoff_route = np.array(pickup_day, pickup_hour, pickup_minute, 1, trip_distance,
                     dropoff_longitude1, dropoff_latitude1, dropoff_longitude2, dropoff_latitude2)

    # combinations of shared ride part price
    shared_route1 = np.array(pickup_day, pickup_hour, pickup_minute, 2, trip_distance,
                     pickup_longitude1, pickup_latitude1, dropoff_longitude1, dropoff_latitude1)
    shared_route2 = np.array(pickup_day, pickup_hour, pickup_minute, 2, trip_distance,
                     pickup_longitude1, pickup_latitude1, dropoff_longitude2, dropoff_latitude2)
    shared_route3 = np.array(pickup_day, pickup_hour, pickup_minute, 2, trip_distance,
                     pickup_longitude2, pickup_latitude2, dropoff_longitude1, dropoff_latitude1)
    shared_route4 = np.array(pickup_day, pickup_hour, pickup_minute, 2, trip_distance,
                     pickup_longitude2, pickup_latitude2, dropoff_longitude2, dropoff_latitude2)
    shared_routes = [shared_route1, shared_route2, shared_route3, shared_route4]

    pickup_price = price_model.predict(pickup_route)
    dropoff_price = price_model.predict(dropoff_route)
    
    min_price = np.inf
    best_route_ind = -1
    for i, route in enumerate(shared_routes):
        shared_price = price_model.predict(pickup_route)
        if shared_price < min_price:
            min_price = shared_price
            best_route_ind = i

    middle_coordinates = shared_routes[best_route_ind][-4:]

    X_new = np.fromiter(features_dic.values(), dtype=float)
    predict_me = X_new.reshape(1, -1)
    y_p = price_model.predict(predict_me)[0]

    return f"{y_p}"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
