# Setup VM

Requirement: Docker has been installed on the host OS.  You can reference documentation here: https://docs.docker.com/engine/install/
Note: This is to standup a quick VM.  To setup a production instance you should utilize the SEMOSS HELM at https://github.com/SEMOSS/SEMOSS_Helm

The .startSEMOSS.sh is useful to start up the instance with the necessary volume mount for the local databases / insights.

To initialize the volume mount /opt/semoss/semosshome, you can first start an instance of SEMOSS using:

```
  docker run -itd --name semoss quay.io/semoss/docker:R4.2.1-debian11
```

Then you can pull the starting semosshome folder by running:

```
  docker cp semoss:/opt/semosshome /opt/semoss/semosshome
```

The base folder /opt/semoss/semosshome can be whatever path you want on the host OS, but if you change it to be different, you will then need to update the script path.  This is the base volume so that if the container is stopped / updated your insights will not be lost.

You can setup the necessary environment variables in the var.env file.  As an example, the REDIRECT url in var.env will need to be updated to the domain name that is being used for the deployment. The current file is not meant to be the full set of options, please refer to https://github.com/SEMOSS/semoss-artifacts/tree/master/artifacts/scripts for all the possible parameterization options.
