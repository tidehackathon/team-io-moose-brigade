## Overall Success Disparity Report

The data shown in this report contains test cases where the overall score was submitted as "Success" while not every participant score was "Success" or it was marked with having an IO Shortfall.

![Alt text](dashboard.png?raw=true)

The query used to pull in this grid is:

```
select exercise_cycle, id, cast(io_shortfall_ind as varchar(50)), overall_result, tc_number, title from testcases where overall_result='Success' and 
(
	(
		id in (
			select testcase_id 
			from test_participants 
			where participant_result != 'Success' 
		) or 
		io_shortfall_ind = true
	)
)
```

This information is then joined with another database where we will store the user notes to justify the overall "Success" score which contains the test case id, the user who submitted the note, the actual note text, and the timestamp the note was added.

This provides us an example of how dashboards are no longer read-only views, but can become into data products allowing read-write capabilities to not just see data quality issues but update them in real time.

Link to insight recipe: https://github.com/tidehackathon/team-io-moose-brigade/tree/main/project/TIDE_Hackathon__a2caf44b-60bf-48ca-b4f6-3d5e048079ea/app_root/version/26e026ee-d263-4146-9a1b-f2ee521b5121

