## Capability Test Success Report

The data shown in this report contains the overall pass/fail percentage of a capability which is defined by the test cases it participated in across all exercise cycles.
A pass is indicated by a test case particpant result score that was submitted as "Success", while a fail is for all other results.
![Alt text](dashboard.png?raw=true)

The [query](https://github.com/tidehackathon/team-io-moose-brigade/blob/main/metrics/capabilities.sql) used to pull in this grid is located in the metrics folder and can easily be altered to redefine pass or fail.

The user can also toggle the view to show the success rate for a given capability per exercise cycle.
![Alt text](dashboard-cycle.png?raw=true)

This allows us to see whether a capability is improving over time as well as its aggregated result. 

Furthermore, the metrics located at the top of the insight show summarization statistics for whatever the user has filtered on. These metrics include:
* The average pass rate for all capabilities
* The total number of tests defined as pass
* The total number of tests defined as fail
* The number of unique capabilities
* The number of capabilities that did not participated in any tests

![Alt text](dashboard-metrics.png?raw=true)

Link to [Insight Recipe Here](https://github.com/tidehackathon/team-io-moose-brigade/tree/main/project/TIDE_Hackathon__a2caf44b-60bf-48ca-b4f6-3d5e048079ea/app_root/version/b9c893e4-b60f-4018-8ae6-7795b65ca6af)