Chrome App
==========

roBrowser can be executed as a Chrome Application to run on a privileged window : no tab, no omnibox : just a clean window.
It give access to some useful API and so, do not depend on JAVA for the socket communication.

###Configuration###

Open **applications/settings.js** and add your own configurations: *packetver*, *width*, *height*, *quality*, *remoteClient*, *grfList*, *servers*, ...
You can see a list of availables parameters [in the getting started guide](http://www.robrowser.com/getting-started#API)

###Creation###

In Chrome, go to the extensions management page by clicking the ![Icon](http://developer.chrome.com/static/images/hotdogmenu.png) settings icon and choose **Tools > Extensions** or by moving to the URL: [chrome://extensions/](chrome://extensions/)

Make sure the **Developer mode** checkbox has been selected.

Click the  **Load unpacked extension** button, navigate to roBrowser main's folder and click **OK**.

Once done, you can execute the application by moving to [chrome://apps/](chrome://apps/) and selecting *roBrowser*.