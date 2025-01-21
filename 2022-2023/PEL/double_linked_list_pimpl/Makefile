test_all: test_listdl.o listdl.o
	g++ test_listdl.o listdl.o -o test_all -std=c++14 
		
test_listdl.o: test_listdl.cpp ListDL.hpp
	g++ -c test_listdl.cpp -o test_listdl.o -std=c++14

listdl.o: ListDL.cpp ListDL.hpp
	g++ -c ListDL.cpp -o listdl.o -std=c++14



