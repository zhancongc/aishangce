import os
# current directory
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # debug mode
    DEBUG = True
    # enable csrf
    CSRF_ENABLED = True
    # mini program's
    APP_ID = 'wx107f16d433135388'

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


config = {
    'development': DevelopmentConfig
}
