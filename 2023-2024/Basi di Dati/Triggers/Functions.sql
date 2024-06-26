-- RETURNS SETOF and TABLE
CREATE FUNCTION f() RETURNS SETOF RECORD AS $$
BEGIN
RETURN QUERY SELECT model, price FROM lab.pc;
END;
$$ LANGUAGE plpgsql;

SELECT m,p FROM f() AS(m integer, p real)

-- OPPURE

CREATE FUNCTION f() RETURNS TABLE(m integer, p real) AS $$
BEGIN
RETURN QUERY SELECT model, price FROM lab.pc;
END;
$$ LANGUAGE plpgsql;

SELECT m,p FROM f()


-- CICLI
CREATE FUNCTION f3(OUT m character(20), OUT p real) RETURNS SETOF RECORD AS $$
declare r RECORD;
BEGIN
	FOR r IN SELECT model, price FROM lab.pc LOOP
	SELECT r.model, r.price INTO m,p;
	RETURN NEXT;
	END LOOP;
END;
$$ LANGUAGE plpgsql;
