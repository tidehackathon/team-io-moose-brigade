-- op domain overall pass count
-- ultimately defined by capabilities that are tied to it
select
       operational_domain_id, operational_domain_name, exercise_cycle, sum(pass_flag) as num_pass, sum(count_flag)-sum(pass_flag) as num_fail,
       sum(count_flag) as total, 
       case when sum(count_flag) = 0 then 0 else sum(pass_flag)/sum(count_flag)::decimal end as pass_rate from (
       select
             od.id as operational_domain_id,
             od."name" as operational_domain_name,
             tp.exercise_cycle,
             case when tp.participant_result in ('Success') then 1 else 0 end as pass_flag,
             case when tp.participant_result is not null then 1 else 0 end as count_flag
       from operational_domains od
       left join capability_operational_domains cod on od.id = cod.operational_domain_id
       left join capabilities c on cod.capability_id = c.id
       left join test_participants tp on c.id = tp.capability_id
) opAchieve
where exercise_cycle is not null 
group by operational_domain_id, operational_domain_name, exercise_cycle
order by operational_domain_id, operational_domain_name, exercise_cycle;
