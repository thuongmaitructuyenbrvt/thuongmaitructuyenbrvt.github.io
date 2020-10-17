#!/usr/bin/env python

import webapp2

class MainHandler(webapp2.RequestHandler):
	def get(self):
		self.response.write('thuong mai brvt!')

app = webapp2.WSGIApplication([
	('/', MainHandler)
], debug=True)
