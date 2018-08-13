import pymongo
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from config import config


db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)
    return app


app = create_app('development')


@app.route('/')
def index():
    return 'Hello, world!'


@app.route('/test/<test_id>')
def test(test_id):
    return 'test: {id}'.format(id=test_id)


@app.route('/test', methods=['GET', 'POST'])
def test_data():
    test_id = request.values.get('test_id')
    if test_id is None:
        return jsonify({'id': -1})
    print('test_id', test_id)
    client = pymongo.MongoClient(host='127.0.0.1', port=27017)
    db = client.aishangce
    try:
        tests = db.test.find_one({'id': int(test_id)}, {'_id': 0})
        if tests is None:
            tests = {'id': -1}
    except Exception as e:
        print(e)
        tests = {'id': -1}
    print('tests:', tests)
    return jsonify(tests)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=7000)
