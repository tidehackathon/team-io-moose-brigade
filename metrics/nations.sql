-- nation overall pass count
-- ultimately defined by capabilities that are tied to it
select
       nation_id, nation_name, exercise_cycle, sum(pass_flag) as num_pass, sum(count_flag)-sum(pass_flag) as num_fail,
       sum(count_flag) as total, 
       case when sum(count_flag) = 0 then 0 else sum(pass_flag)/sum(count_flag)::decimal end as pass_rate from (
       select
             n.id as nation_id,
             n."name" as nation_name,
             tp.exercise_cycle,
             case when tp.participant_result in ('Success') then 1 else 0 end as pass_flag,
             case when tp.participant_result is not null then 1 else 0 end as count_flag
       from nations n
       left join capabilities c on n.id = c.nation_id
       left join test_participants tp on c.id = tp.capability_id
) nationAchieve
group by nation_id, nation_name, exercise_cycle
order by nation_id, nation_name, exercise_cycle;
