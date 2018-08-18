import pymongo, random, requests, json, time, threading, sys
from flask import Flask, jsonify, request, Response
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    return app


app = create_app('development')


def out_log(message):
    with open('debug.log', 'a') as f:
        f.write(time.ctime() + ' ' + message)
        f.write('\n')


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


def wxlogin(code):
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code'
    out_log(url.format(app.config.get('APP_ID'), app.config.get('APP_SECRET'), code))
    r = requests.get(url.format(app.config.get('APP_ID'), app.config.get('APP_SECRET'), code))
    return json.loads(r.text)


@app.route('/')
def ping():
    return 'Hello, World!'


@app.route('/image/<image_name>')
def images(image_name):
    image_data = open("static/images/{0}".format(image_name), "rb").read()
    resp = Response(image_data, mimetype="image/jpeg")
    return resp


@app.route('/login', methods=['POST'])
def login():
    code = request.values.get('code')
    out_log('code:'+('None' if code is None else code))
    if code is None:
        return jsonify({'login': False})
    openid = wxlogin(code).get('openid')
    out_log('openid'+('None' if openid is None else openid))
    if openid is None:
        return jsonify({'login': False})
    db = get_db()
    if db.test.find({'openid': openid}).count() == 0:
        db.user.insert({'openid': openid})
    else:
        db.user.update({'openid': openid}, {'$set': {'last_login': time.time()}}, {'upsert': True})
    return jsonify({'login': True, 'openid': openid})


@app.route('/index')
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
    weixin = request.values.get('weixin')
    content = request.values.get('content')
    time_stamp = time.time()
    json_data = {'weixin': weixin, 'content': content, 'time_stamp': time_stamp}
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
