-- cap overall pass count
select
       capability_id, capability_name, exercise_cycle, sum(pass_flag) as num_pass, sum(count_flag)-sum(pass_flag) as num_fail,
       sum(count_flag) as total, 
       case when sum(count_flag) = 0 then 0 else sum(pass_flag)/sum(count_flag)::decimal end as pass_rate from (
select
       c.id as capability_id,
       c."name" as capability_name,
       tp.exercise_cycle,
       case when tp.participant_result in ('Success') then 1 else 0 end as pass_flag,
       case when tp.participant_result is not null then 1 else 0 end as count_flag
from capabilities c
left join test_participants tp on c.id = tp.capability_id
left join testcases t on tp.testcase_id = t.id order by tp.testcase_id
) capAchieve
group by capability_id, capability_name, exercise_cycle
order by capability_id, capability_name, exercise_cycle;
