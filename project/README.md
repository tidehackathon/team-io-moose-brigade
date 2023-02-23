# Project Setup

Projects in SEMOSS contain a ".smss" file which holds connection details to a small H2 database and a corresponding folder containing the insight pixel recipes and additional assets (custom scripts/visualizations) to produce the reports. As an example, TIDE_Hackathon__a2caf44b-60bf-48ca-b4f6-3d5e048079ea folder and TIDE_Hackathon__a2caf44b-60bf-48ca-b4f6-3d5e048079ea.smss represent a single project together.

The insight database can be opened and viewed through your SQL Client of choice (DBeaver, DbVisualizer, etc.). It contains the recipe steps to produce the insight as well as metadata around the insight. It does not contain the actual data of the report, the recipe is executed at runtime (similar to an excel macro) and pulls the information from the databases to generate the final view (slight exception with caching of insights but can ignore this caveat for now).

You can create a zip file containing the project smss file with its corresponding project folder and upload it into your SEMOSS instance through the landing page:

![Alt text](../img/project-upload.png?raw=true "SEMOSS Project Upload UI")
