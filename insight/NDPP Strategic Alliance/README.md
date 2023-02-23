# NDPP Strategic Alliance

This insight is used as a data product to attempt to probabilistically match the NDPP strategic areas to the focus areas that the tests are focused on.  We utilized a cosine similarity and only grab the best match.

The insight that executes and generated the mapping can be [found here](https://github.com/tidehackathon/team-io-moose-brigade/tree/main/project/TIDE_Hackathon__a2caf44b-60bf-48ca-b4f6-3d5e048079ea/app_root/version/93c2d52f-e4ae-40fd-902e-ba9562db90d5)


---


#### Running the r script locally
Note: this requires 2 csv's with the input data in your working directory

```r
library(data.table);
library(stringdist);

ndpp = fread('ndpp.csv');
areas = fread('focus_area.csv');

library(data.table);
library(stringdist);

col1 = ndpp$description;
col2 = areas$name;
d = stringdistmatrix(col1,col2,method='cos',p=0.1);

result = data.table(ndpp=character(), area=character(), match=numeric());
for(row in 1:nrow(d)){
	thisrow = d[row,];
	result=rbind(result, list(col1[row], col2[which.min(thisrow)], thisrow[which.min(thisrow)]));
}
```
