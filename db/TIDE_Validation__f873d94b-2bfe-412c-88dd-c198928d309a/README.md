## SQL Generation Script

public.capabilities_overall_pass definition
```
-- Drop table
-- DROP TABLE public.capabilities_overall_pass;

CREATE TABLE public.capabilities_overall_pass (
	capability_id varchar(800) NULL,
	capability_name varchar(800) NULL,
	exercise_cycle varchar(800) NULL,
	num_fail int4 NULL,
	num_pass int4 NULL,
	pass_rate float8 NULL,
	total int4 NULL
);
```

public.nations_overall_pass definition
```
-- Drop table
-- DROP TABLE public.nations_overall_pass;

CREATE TABLE public.nations_overall_pass (
	exercise_cycle varchar(800) NULL,
	nation_id varchar(800) NULL,
	nation_name varchar(800) NULL,
	num_fail int4 NULL,
	num_pass int4 NULL,
	pass_rate float8 NULL,
	total int4 NULL
);
```

public.operational_domain_overall_pass definition
```
-- Drop table
-- DROP TABLE public.operational_domain_overall_pass;

CREATE TABLE public.operational_domain_overall_pass (
	exercise_cycle varchar(800) NULL,
	num_fail int4 NULL,
	num_pass int4 NULL,
	operational_domain_id varchar(800) NULL,
	operational_domain_name varchar(800) NULL,
	pass_rate float8 NULL,
	total int4 NULL
);
```

public.user_success_disparity definition
```
-- Drop table
-- DROP TABLE public.user_success_disparity;

CREATE TABLE public.user_success_disparity (
	id int4 NULL,
	notes varchar(800) NULL,
	userid varchar(255) NULL,
	insertion_timestamp timestamp NULL
);
```
