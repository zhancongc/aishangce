import tornado.ioloop
import tornado.web
import tornado.options


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

    def post(self):
        self.write('None')


def make_app():
    return tornado.web.Application([
        (r'/', MainHandler)
    ], debug=True)


if __name__ == "__main__":
    application = make_app()
    application.listen(8888)
    #tornado.options.parse_config_file("server.conf")
    #tornado.options.define(name='debug', default=True)
    tornado.ioloop.IOLoop.current().start()
