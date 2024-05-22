#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <signal.h>

#define MAX 10000 // numero loop
#define NKEY 10  // chiavi di cifratura da 0 a NKEY-1

int main(){
    int desc0,  //lettura
        desc1; //scrittura
    char *pipeOut = "/tmp/pipeOut", *pipeIn = "/tmp/pipeIn";
    char c;
    int numcifr;
    char chiave;

   desc0 = open(pipeOut, O_RDONLY); //apertura lettura
   desc1 = open(pipeIn, O_WRONLY); //apro il scrittura
   if(desc0 < 0 || desc1 < 0){
        perror("Errore apertura pipe");
        exit(1);
   }
   else{
        while(read(desc0, &c, 1)){
            numcifr = 'A' - c;
            chiave = c + numcifr;
            write(desc1, &chiave, 1);
            while(chiave != '#'){
                read(desc0, &c, 1);
                chiave = c + numcifr;
                write(desc1, &chiave, 1);
            }
        }
   }
   close(desc0); //chiudo in scrittura
   close(desc1); //chiudo il lettura

}