#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#define SUCCESSO "PIN %s corretto! >>> Sei autenticato <<<\n"
#define FALLIMENTO "PIN %s errato\n"
#define PINsegreto "01234"

int main(int argc, char **argv) {
    if (argc == 1) {
        printf("Utilizzo: %s PIN\n(Il PIN è di %ld cifre e può iniziare per 0!)\n",
               argv[0], strlen(PINsegreto));
        exit(2); // Wrong usage
    }
    if (strcmp(PINsegreto,argv[1])==0) {
        printf(SUCCESSO,argv[1]);
        // qui si avrebbe accesso alle risorse se fosse un PIN vero ...
        exit(0); // success
    } else {
        printf(FALLIMENTO, argv[1]);
        exit(1); // wrong PIN
    }

}