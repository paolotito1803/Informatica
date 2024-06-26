create function no_pc_laptop() RETURNS trigger AS $$
BEGIN
	IF (NEW.type = ’pc’ AND NEW.maker IN (SELECT maker
			FROM lab.Product WHERE type = ’laptop’)) THEN
	RETURN NULL;
	end if;
	IF (NEW.type = ’laptop’ AND NEW.maker IN (SELECT maker
		FROM Product WHERE type = ’pc’)) THEN
	RETURN NULL;
END IF;
return new;

end;
$$ LANGUAGE plpgsql;

CREATE TRIGGER NoPCLaptop
BEFORE INSERT OR UPDATE
ON lab.Product
FOR EACH ROW
EXECUTE FUNCTION no_pc_laptop();
