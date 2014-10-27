__author__ = 'Corn'

#!flask/bin/python
import app

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from app import app

if __name__ == '__main__':
    app.config["DEBUG"] = True
    app.run()
