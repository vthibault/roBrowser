Setup the remote client
=======================

The remote client exist to help users without a FullClient on their computer to play by downloading resources from an external server.
Because pushing directly the fullclient on a server/ftp can provoke some errors, this tool allow to :

 - Get the files from a client used in another domain (Cross-origin resource sharing).
 - Extracting file directly from GRF archive file (only version 0x200 supported for now).
 - Converting BMP files to PNG to speed up the transfer (downloading).
 - Optimized to don't call any script if files are already extracted/converted (resource friendly).

###Add your fullclient###

Just put your fullclient files in this directory. If you want to put only the required files, put :

 - *DATA.INI*
 - Your *GRFs* files (listed in the DATA.INI file)
 - *data/* folder
 - *BGM/* folder

**Note: to be sure to use a compatible version of your GRFs, download *GRF Builder* and repack them manually, it will ensure the GRFs files are converted in the proper version (*0x200*) and without the *DES encryption***

-----------------

###Configure the remote client###

Open *"index.php"* file

 - Where is locate your fullclient ?

    `Client::$path        =  ""           ;`

 If the fullclient is locate as default, in the current directory, let the string empty.

 - The remote client need to know your data.ini file name, so complete the line:

    `Client::$data_ini    =  "data.ini"   ;`

 **Note:** It's case sensitive

 - Do you want to extract files from your GRFs into the data directory to use less server resources ?

    `Client::$AutoExtract =  false        ;`

----------------

###Configure the rewrite rule###

Open *".htaccess"* file, you will have some example on how to modify the rewrite rule to match your url location.

    ex : myroserver.com/client/
    ErrorDocument 404 /client/index.php

    ex : myroserver.com/low/client/
    ErrorDocument 404 /low/client/index.php

    ex : client.myroserver.com/
    ErrorDocument 404 /index.php
