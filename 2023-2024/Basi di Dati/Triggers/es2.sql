create function no_cheap_laptop() RETURNS trigger AS $$
	begin
		if exists(select *
				 from lab.pc
				 where new.ram > ram and new.price <= price) then
			return null;
		end if;
			return new;
	end;
$$ LANGUAGE plpgsql;


create trigger NoCheapLaptop
before insert or update
on laptop
for each row EXECUTE function no_cheap_laptop();