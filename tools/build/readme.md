Compiling scripts
=================

roBrowser contains hundred of files, loading them in a production server taken just too much time.
This directory will help merging all project's files to a new one, optimized, and compressed.

###Utilization###

Open the file *"index.html"* in your web browser and **select the Application** you want to compile (*Online*, *GrfViewer*, *ModelViewer*, *MapViewer*, *Thread*).

Once the compilation done, you can save the generated file to the specified location.

**Note: All applications required the *Thread* application compiled.**

###Configure roBrowser###

To use the compiled version of roBrowser, go to your configuration object (called *ROConfig*) and set the parameter *development* to **false**.