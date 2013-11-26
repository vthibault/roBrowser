Setup the remote client
=======================

###Add your fullclient###

Just put your fullclient files in this directory. If you want to put only the required files, put :

 - *DATA.INI*
 - Your *GRFs* files (listed in the DATA.INI file)
 - *data/* folder
 - *BGM/* folder

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