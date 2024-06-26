create function  RETURNS trigger check_wellformed() AS $$
begin
	if new.model in(select model from lab.laptop union
					select model from lab.pc union
					select model from lab.printer 
				   ) then
		return new;
	end if;
	return null;
end;
$$ LANGUAGE plpgsql;


create trigger 
before insert or update 
on lab.product
FOR EACH ROW EXECUTE FUNCTION check_wellformed();