__author__ = 'Corn'

#coding=utf-8

from app import app
from flask import json, render_template, request, url_for, redirect, flash

import requests

ap_url= app.config["APIURL"]
ap_key = app.config["AIRPORT_KEY"]

'''################# homepage ##################'''
@app.route('/')
@app.route('/index')
def home():
  return render_template('home.html')

'''################# request airport - GET ##################'''
#GET airport distance request
@app.route('/airport_request/<from_ap>/<to_ap>/<unit>', methods=['GET'])
def airport_request(from_ap, to_ap, unit):
  requestUrl = ap_url+'distance/'+from_ap+'/'+to_ap+'?user_key=' + ap_key + '&units=' +unit
  r = requests.get(requestUrl)
  print r.content
  return r.content


#GET airport info request
@app.route('/airport_request/<ap>', methods=['GET'])
def airport_info_request(ap):
  requestUrl = ap_url+ap+'?user_key=' + ap_key
  print requestUrl
  r = requests.get(requestUrl)
  print r.content
  return r.content
