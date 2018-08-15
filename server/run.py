import pymongo, random
from flask import Flask, jsonify, request
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    return app


app = create_app('development')


def get_db():
    client = pymongo.MongoClient(host='127.0.0.1', port=27017)
    return client.aishangce


def get_test(test_id):
    db = get_db()
    try:
        tests = db.test.find_one({'id': int(test_id)}, {'_id': 0})
        if tests is None:
            return {'id': -1}
    except Exception as e:
        print(e)
        return {'id': -1}
    return tests


@app.route('/')
def ping():
    return 'Hello, world!'


@app.route('/index', methods=['GET'])
def index():
    db = get_db()
    num = db.test.find().count()
    arr = random.sample([i for i in range(num)], 3)
    array = []
    for a in arr:
        array.append(get_test(a))
    return jsonify(array)


@app.route('/feedback', methods=['POST'])
def feedback():
    nickname = request.values.get('nickname')
    weixin = request.values.get('weixin')
    content = request.values.get('content')
    time_stamp = request.values.get('time_stamp')
    json_data = {'nickname': nickname, 'weixin': weixin,
                 'content': content, 'time_stamp': time_stamp}
    db = get_db()
    db.feedback.insert(json_data)
    res = {'operation': True}
    return jsonify(res)


@app.route('/test', methods=['POST'])
def test_data():
    test_id = request.values.get('test_id')
    if test_id is None:
        return jsonify({'id': -1})
    print('test_id', test_id)
    tests = get_test(test_id)
    return jsonify(tests)


if __name__ == '__main__':
    app.run()
