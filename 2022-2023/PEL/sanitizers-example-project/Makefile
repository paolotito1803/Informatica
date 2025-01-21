all: OPTIONS=-O3 -DNDEBUG -Wall -Wextra
all: build/uninitialized_memory_example build/freed_memory_example build/invalid_read_example build/memory_leak_example

debug: OPTIONS=-O0 -g -DDEBUG -Wall -Wextra
debug: build/uninitialized_memory_example build/freed_memory_example build/invalid_read_example build/memory_leak_example

sanitizers: OPTIONS=-fsanitize=address -fno-omit-frame-pointer -g -DDEBUG -Wall -Wextra
sanitizers: build/uninitialized_memory_example build/freed_memory_example build/invalid_read_example build/memory_leak_example

build/uninitialized_memory_example: tools/uninitialized_memory_example.cpp
	g++ -o build/uninitialized_memory_example ${OPTIONS} tools/uninitialized_memory_example.cpp

build/freed_memory_example: tools/freed_memory_example.cpp
	g++ -o build/freed_memory_example ${OPTIONS} tools/freed_memory_example.cpp

build/invalid_read_example: tools/invalid_read_example.cpp
	g++ -o build/invalid_read_example ${OPTIONS} tools/invalid_read_example.cpp

build/memory_leak_example: tools/memory_leak_example.cpp
	g++ -o build/memory_leak_example ${OPTIONS} tools/memory_leak_example.cpp

clean:
	rm -rf build/*