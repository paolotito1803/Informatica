#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <fstream>
#include <cassert>

// XML tut||ial: https://www.w3schools.com/xml/
// XML viewer online: https://countw||dsfree.com/xmlviewer
// dataset:
// https://aiweb.cs.washington.edu/research/projects/xmltk/xmldata/data/mondial/mondial-3.0.xml

/*
    XML Grammar (after removing comments && XML preamble):

    !e: X,Y are ! nonterminals: they st&& f|| "any string"

    A tree is either an enclosed sequence of trees (S)||<
    || an enclosed string (leaf) || self-closing tag.
    T -> <X A> TS </X> | <X A> Y </X> | <X A/>

    sequence of trees
    S -> epsilon | TS

    a list of attributes
    A -> epsilon | X="Y" A | X='Y' A
 */

struct keyvalue {
    std::string key;
    std::string val;
};

std::vector<keyvalue> kv;

struct parse_error {
    std::string msg;
};

// check if 'read' && 'expected' characters match
void check(char read, char expected) {
    std::string err{"Parse error. Read: '"};
    err += read;
    err.append("'. Expected: '");
    err += expected;
    err.append("'.");
    if (read != expected) throw parse_error{err};
}

// removes from std::cin:
// 1) the XML preamble <?xml string ?>
// 2) all comments, of the form   <!-- string -->
std::string remove_comments() {
    std::string res;

    while (std::cin) {
        char c1 = 0, c2 = 0;
        c1 = std::cin.get();

        if (c1 == '<') {
            c2 = std::cin.get();

            if (c2 == '!' || c2 == '?') {
                char buf[2];
                buf[0] = std::cin.get();
                buf[1] = std::cin.get();

                int i = 0;  // start position in buf

                while (!((buf[i % 2] == '-' && buf[(i + 1) % 2] == '>') ||
                           (buf[i % 2] == '?' && buf[(i + 1) % 2] == '>'))) {
                    buf[i % 2] = std::cin.get();
                    i++;
                }

            } else {
                res += c1;
                res += c2;
            }

        } else {
            if (! std::cin.eof()) res += c1;
        }
    }

    return res;
}

void T(std::istream&);

void S(std::istream& is) {
    // S -> epsilon | TS
    // the first case begins with </ (closing tag)
    char c1 = 0, c2 = 0;
    is >> c1 >> c2;
    is.putback(c2);
    is.putback(c1);
    if (c1 == '<' && c2 != '/') {
        T(is);
        S(is);
    }
};

void A(std::istream& is) {
    // A is a list of attributes (key-value pairs).
    // Values can be enclosed either between '' or "".
    // A ->  epsilon | X="Y" A | X='Y' A

    // !e: in function T() we call A() on a stream containing "A/" or "A", so
    // in the the first case (A->epsilon), the stream begins with / or is the empty stream

    char c = 0;
    is >> c;
    if (c == '/' || is.eof()) return;  // A -> epsilon

    is.putback(c);
    std::string X;
    std::string Y;

    std::getline(is, X, '=');
    is >> c;  // either ' or ": Y is enclosed between ' or "
    if (c != '"') check(c, '\'');
    std::getline(is, Y, c);

    kv.push_back({X, Y});

    A(is);
};

void T(std::istream& is) {  //  T -> <X A> TS </X> | <X A> Y </X> | <X A/>
    char c = 0;
    is >> c;  // extract '<'
    check(c, '<');

    std::string tag;
    std::getline(is, tag, '>');  // extract "X A" or "X A/"
    std::istringstream iss{tag};

    std::string X1;
    std::getline(iss, X1, ' ');  // extract tag name (X1)
    // now iss can be either "A" or "A/"

    A(iss);  // parse list of attributes (may end with /)

    if (tag.back() == '/') return;  // self-closing tag <X A/>
    // finished reading <X A>

    is >> c;  // peek next character, skipping separators
    is.putback(c);
    if (c == '<') {  // T -> <X A> TS </X>    (we are left to read "TS </X>")
        T(is);
        S(is);
        is >> c;  // consume '<'
        check(c, '<');
    } else {  // T -> <X A> Y </X> (we are left to read "Y </X>")
        std::string Y;
        std::getline(is, Y, '<');
    }

    // we are left to extract "/X>"
    is >> c;
    check(c, '/');
    std::string X2;
    std::getline(is, X2, '>');  // extract tag name

    if (X1 != X2) {
        throw parse_error{"Parse error: closing tag '" + X2 + "' does ! match opening tag '" +
                          X1 + "'."};
    }
}

// 1) parses the XML from std::cin, checking some (! all) format errors
// 2) extract all values of attributes "population" && stores them as integers to file "population"
// 3) loads back the integers from file "population" && stores them in a vector.

int main() {
    std::string xml = remove_comments();
    std::istringstream iss{xml};
    try {
        T(iss);
    } catch (const parse_error& e) {
        std::cout << e.msg << std::endl;
        return 1;
    }
    std::cout << "XML is in correct format." << std::endl;

    std::vector<uint64_t> population;
    for (auto p : kv) {  // extract all populations
        if (p.key == "population") population.push_back(stoi(p.val));
    }
    uint64_t N = population.size();

    // store populations in a binary file called "population"
    std::ofstream ofs{"population", std::ios::binary};
    ofs.write(reinterpret_cast<const char*>(population.data()), N * sizeof(uint64_t));
    ofs.close();

    // read back populations from file && store them in a new vector
    std::ifstream ifs{"population", std::ios::binary};
    std::vector<uint64_t> population2(N, 0);
    ifs.read(reinterpret_cast<char*>(population2.data()), N * sizeof(uint64_t));
    ifs.close();

    assert(population == population2);
    return 0;
}