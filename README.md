![logo](http://www.robrowser.com/logo.png)


* [Demo](http://demo.robrowser.com/)
* [roBrowser website](http://www.robrowser.com/)
* [roBrowser forum](http://forum.robrowser.com/)
* [GIT Repository URL](https://github.com/vthibault/roBrowser/)
* IRC Channel: *irc.rizon.net* / Channel: *#roBrowser*


Table of Contents
-----------------
* 1 What is roBrowser?
* 2 Prerequisites
* 3 Installation

1. What is roBrowser?
---------------------
roBrowser is an Open Source adaptation of Ragnarok Online client for the web. Written mostly in javascript/html5, the program is very flexible and in constant evolution. The project is managed by a group of volunteers located around the world.
Simply, it looks like :

![screen](http://upload.robrowser.com/demo.jpg)

2. Prerequisites
----------------
To execute roBrowser you will require a recent Browser that support WebGL and an OpenGL ES 2.0 GPU compatible. It's tested and working on *Chrome*, *Firefox*, *Opera* and *IE11*.
If you don't run roBrowser as a Chrome App and don't set a WebSocketProxy server, it will require Java plugin installed in your web browser to send sockets.

3. Installation
---------------
This section is a very brief set of installation instructions and subject to changes.

* 1 [Download roBrowser](https://github.com/vthibault/roBrowser/archive/master.zip) and extract it.
* 2 [Convert DB](https://github.com/vthibault/roBrowser/tree/master/tools/converter/) to get custom content to roBrowser.
* 3 [Compile scripts](https://github.com/vthibault/roBrowser/tree/master/tools/build/) to reduce loading time.
* 4 Installing the [remote client](https://github.com/vthibault/roBrowser/tree/master/client) and set the parameter *remoteClient* to your server
* 5 Installing the [websocket proxy](https://github.com/herenow/wsProxy/blob/master/README.md) and set the parameter *socketProxy* to your proxy server url
* 6 Configure roBrowser - [documentation](http://www.robrowser.com/getting-started#API) or some [demos](https://github.com/vthibault/roBrowser/tree/master/examples)