Compiling scripts
=================

roBrowser contains hundred of files, loading them in a production server taken just too much time.
This directory will help merging all project's files to a new one, optimized, and compressed.

###Utilization###

Open the file *"index.html"* in your web browser, **select the Application** you want to compile (*Online*, *GrfViewer*, *ModelViewer*, *MapViewer*, *Thread*).
Click on the button **Compile** and wait until the compilation is done, it can take some time.

The generated script will happened in *Compiled Result*, copy the content and save it in the path specified.

**Note: All applications required the *Thread* application compiled.**

###Configure roBrowser###

To use the compiled version of roBrowser, go to your configuration object (called *ROConfig*) and set the parameter *development* to **false**.