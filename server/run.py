import pymongo, random, requests, json, time
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


def get_test_by_id(test_id):
    db = get_db()
    try:
        tests = db.test.find_one({'id': int(test_id)}, {'_id': 0})
        if tests is None:
            return {'id': -1}
    except Exception as e:
        print(e)
        return {'id': -1}
    return tests


def get_test_by_title(keyword):
    db = get_db()
    try:
        tests = db.test.find({'title': {'$regex': keyword, '$options': 'i'}}, {'_id': 0})
    except Exception as e:
        print(e)
        return None
    return tests


def wxlogin(code):
    appid = app.config.get('APP_ID')
    with open('appsecret', 'r') as f:
        app_secret = f.readline().strip()
    url = 'https://api.weixin.qq.com/sns/jscode2session'
    data = {'js_code': code, 'secret': app_secret, 'grant_type': 'authorization_code',
            'appid': appid}
    r = requests.post(url,data=data)
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
    if code is None:
        return jsonify({'login': False})
    openid = wxlogin(code).get('openid')
    # out_log('openid'+('None' if openid is None else openid))
    if openid is None:
        return jsonify({'login': False})
    db = get_db()
    if db.user.find({'openid': openid}).count() > 1:
        db.user.remove({'openid': openid}, multi=True)
        db.user.insert({'openid': openid, 'login_time': time.time()})
    else:
        db.user.update({'openid': openid}, {'$set': {'login_time': time.time()}}, upsert=True)
    return jsonify({'login': True, 'openid': openid})


@app.route('/index')
def index():
    db = get_db()
    num = db.test.find().count()
    arr = random.sample([i for i in range(num)], 4)
    array = []
    for a in arr:
        array.append(get_test_by_id(a))
    return jsonify(array)


@app.route('/user', methods=['POST'])
def record_user_test():
    open_id = request.values.get("openid")
    test_id = request.values.get('test_id')
    result_id = request.values.get('result_id')
    timestamp = time.time()
    if open_id is None or test_id is None or result_id is None:
        return jsonify({"status": 0, "message": "data is broken"})
    db = get_db()
    try:
        json_data = {"result_id": int(result_id), "timestamp": timestamp}
        print(json_data)
        db.user_test.update({"openid": open_id, "test_id": int(test_id)}, {"$set": json_data}, upsert=True)
    except Exception as e:
        return jsonify({"status": 0, "message": e})
    return jsonify({"status": 1, "message": "success"})


@app.route('/user/test', methods=['POST'])
def get_user_test():
    open_id = request.values.get("openid")
    print("open_id: ", open_id)
    if open_id is None:
        return jsonify({"status": 0, "message": "data is broken"})
    db = get_db()
    try:
        cur = db.user_test.find({"openid": open_id}, {"_id": 0})
    except Exception as e:
        return jsonify({"status": 0, "message": e})
    if cur.count() == 0:
        return jsonify({"status": 2, "message": "cannot find data"})
    array = [c for c in cur]
    for arr in array:
        temp_test = get_test_by_id(arr['test_id'])
        arr['title'], arr['image'] = temp_test['title'], temp_test['image']
        arr['timestamp'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(arr['timestamp']))
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
    test_id, keyword = request.values.get('test_id'), request.values.get('keyword')
    if test_id is None and keyword is None:
        return jsonify({'id': -1})
    elif test_id is not None:
        print('test_id: ', test_id)
        tests = get_test_by_id(int(test_id))
        return jsonify(tests)
    else:
        print('keyword: ', keyword)
        cur = get_test_by_title(keyword)
        if cur.count() == 0:
            return jsonify({"id": -1})
        array = [c for c in cur]
        print(len(array))
        return jsonify(array)


if __name__ == '__main__':
    app.run()
