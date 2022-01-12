from flask import Flask
from flask import request
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)


@app.route('/predict_price')
def predict_price():
    features_dic = {'coordinates of pickup': request.args.get('coordinates of pickup'),
                    'drop-off and time': request.args.get('drop-off and time'),
                    }

    X_new = np.fromiter(features_dic.values(), dtype=float)
    predict_me = X_new.reshape(1, -1)
    y_p = 1

    return f'{y_p}'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
