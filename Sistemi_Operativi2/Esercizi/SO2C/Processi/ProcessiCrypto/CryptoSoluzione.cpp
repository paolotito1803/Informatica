#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(){
    int desc0; //lettura
    int desc1; //scrittura
    int decifratura;
    char cifrata;
    char c;
    desc0 = open("/tmp/pipeOut", O_RDONLY);
    desc1 = open("/tmp/pipeIn", O_WRONLY);
    if(desc0 < 0 || desc1 < 0){
        perror("errore apertura");
        exit(1);
    }
    else{
        while(read(desc0, &c, 1)){
            decifratura = 'A' - c;
            cifrata = c + decifratura;
            write(desc1, &cifrata, 1);
            while(cifrata != '#'){
                read(desc0, &c, 1);
                cifrata = c + decifratura;
                write(desc1, &cifrata, 1);
            }
        }
    }
    close(desc0);
    close(desc1);




















    /*int cifratura;
    int desc0, desc1;
    char c;
    char nuovocarattere;
    
    desc0 = open("/tmp/pipeOut", O_RDONLY); //apro in lettura
    desc1 = open("/tmp/pipeIn", O_WRONLY); //apro scrittura
    if(desc0 <0 || desc1 < 0){
        perror("errore apertura");
        exit(1);
    }
    else{
        while(read(desc0, &c, 1)){
            cifratura = 'A' - c;
            nuovocarattere = c + cifratura;
            write(desc1, &nuovocarattere, 1);
            while(nuovocarattere != '#'){
                read(desc0, &c, 1);
                nuovocarattere = c + cifratura;
                write(desc1, &nuovocarattere, 1);
            }
        }

    }

    close(desc0);
    close(desc1);*/
}