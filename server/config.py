import os
# current directory
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # debug mode
    DEBUG = True
    # enable csrf
    CSRF_ENABLED = True
    # csrf key
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'

    # ip
    GCLD_IP = '10.5.201.58'
    NHLY_IP = '10.5.201.60'

    # folder maintains uploaded file
    UPLOAD_FOLDER = basedir + '/files/upload/'
    # folder maintains out file
    OUT_FOLDER = basedir + '/files/out/'
    # max size of uploaded file
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024

    # commit on
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    # track modifications is suggested opening
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    pass
    #database uri
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:security@localhost:3306/gametool?charset=utf8mb4'


config = {
    'development': DevelopmentConfig
}
