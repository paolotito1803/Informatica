all: build/prodottomatriciale

debug: OPTIONS=-O0 -g
debug: build/prodottomatriciale

build/prodottomatriciale: build/prodotto.o build/matrix_create.o build/check.o  tools/main.cpp
	g++ ${OPTIONS} tools/main.cpp -o build/prodottomatriciale -I include/ build/prodotto.o build/matrix_create.o build/check.o  

build/matrix_create.o: src/matrix_create.cpp include/functions.hpp
	g++ ${OPTIONS} -c src/matrix_create.cpp -o build/matrix_create.o -I include/

build/prodotto.o: include/functions.hpp
	g++ ${OPTIONS} -c src/prodotto.cpp -o build/prodotto.o -I include/

build/check.o: src/check.cpp include/functions.hpp
	g++ ${OPTIONS} -c src/check.cpp -o build/check.o -I include/

clean:
	rm -rf build/*.o build/prodottomatriciale