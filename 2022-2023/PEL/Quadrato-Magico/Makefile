all: build/quadratomagico

debug: OPTIONS=-O0 -g
debug: build/quadratomagico

build/quadratomagico: build/somma.o build/num_diff.o build/inizializzazione.o build/vector_create.o tools/main.cpp
	g++ ${OPTIONS} tools/main.cpp -o build/quadratomagico -I include/ build/somma.o build/num_diff.o build/inizializzazione.o build/vector_create.o

build/vector_create.o: src/vector_create.cpp include/function.hpp
	g++ ${OPTIONS} -c src/vector_create.cpp -o build/vector_create.o -I include/

build/num_diff.o: src/num_diff.cpp include/function.hpp
	g++ ${OPTIONS} -c src/num_diff.cpp -o build/num_diff.o -I include/

build/inizializzazione.o: src/inizializzazione.cpp include/function.hpp
	g++ ${OPTIONS} -c src/inizializzazione.cpp -o build/inizializzazione.o -I include/

build/somma.o: src/somma.cpp include/function.hpp
	g++ ${OPTIONS} -c src/somma.cpp -o build/somma.o -I include/

clean:
	rm -rf build/*.o build/quadratomagico