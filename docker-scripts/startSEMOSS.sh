#!/bin/bash
activePort=80

currDir=/opt/semoss

docker run -itd --name semoss \
--env-file    $currDir/var.env \
-v /opt/semoss/tomcat-logs:/opt/apache-tomcat-9.0.63/logs \
-v /opt/semoss/semosshome:/opt/semosshome \
-p $activePort:8080 quay.io/semoss/docker:R4.2.1-debian11 /bin/bash -c 
"runCS.sh"
