Airport-Distance
================

> A web app that calculates the distance (in nautical miles) between two airports. 

> Features:

- Auto-complete the airports, with jQuery UI autocomplete

- Feature all airports in the US, with self-build airports.js file

- Calculate the distance of two airports, with SITA Airport API for airport info and distance

- Plot the trip on Google maps, with Google Map API and gmaps.js library

- Python Flask framwork to support cross domian issue with SITA API

Installation
------------
- Check your Python Version, 2.7.* would be best
```
Python -V
```
- install Flask
- install requests


```
pip install Flask
pip install requests

```

- Run the app
```
python run.py
```
- The app will be running on http://127.0.0.1:5000/
 
Tech
-----------
This work uses a number of open source projects to work properly:

* [flask] - The Web microframework for perfectionists with deadlines.
* [jQuery] - The Write Less, Do More, JavaScript Library. 
* [jQuery UI] - Set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library
* [Ajax] - jQuery library to load data from the server without a browser page refresh
* [bootstrap] - The most popular front-end framework for developing responsive, mobile first projects on the web.
* [SITA Airport API] - The public API from SITA Developers, to retrieve information about airports.
* [Google Maps JavaScript API V3] - Embed the robust functionality and usefulness of Google Maps into website
* [gmaps.js] - Google Maps API with less pain and more fun

Author
--------------
* Xiaoli Jiang <jiangxiaoli1104@gmail.com>

License
----

MIT

[flask]: http://flask.pocoo.org/
[jQuery]: http://jquery.com
[jQuery UI]: http://jqueryui.com
[Ajax]: http://api.jquery.com/category/ajax
[bootstrap]:http://getbootstrap.com
[SITA Airport API]: https://www.developer.aero/Airport-API
[Google Maps JavaScript API V3]: https://developers.google.com/maps/documentation/javascript
[gmaps.js]: http://hpneo.github.io/gmaps