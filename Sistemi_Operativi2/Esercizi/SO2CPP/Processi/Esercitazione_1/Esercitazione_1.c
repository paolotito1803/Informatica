#include <fcntl.h>
#include <sys/types.h>
#include <sys/uio.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 il programma apre le due pipe, poi successivamente fa un ciclio for a vuoto in modo da saltare i primin34 caratteri che non sono numeri.
 Successivamente mi fa un while in cui legge un numero e controlla che sia compreso tra 0 e 9
 successivamente faccio un altro ciclo for in modo da saltare ,y=
 infine ripeto il while per leggere i numeri.
 fuori dai cicli e calcola la somma dei numeri e poi la converte in stringa e la scrive in desc1 
*/

int main(){
    int desc0, desc1;
    char c;
    int numero1, numero2;
    char end = '\n';
    char numero_stampato[128];
    int i, j;

    desc0 = open("/tmp/pipeOut", O_RDONLY); //apro pipe in lettura
    desc1 = open("/tmp/pipeIn", O_WRONLY); //apro pipe in scrittura

    if(desc0 <0 || desc1 < 0){
        perror("errore apertura pipe");
        exit(1);
    }
    else{
        while(1){
            for(i = 0; i < 34 && read(desc0, &c, 1); i++); //lettura dei caratteri prima della parte che ci interessa dei numeri
            if(i < 34){
                //perror("errore lunghezza");
                exit(0);
            }
            numero1 = 0;
            while(read(desc0, &c, 1) && c >= '0' && c <= '9'){ //leggo i numeri che mi interesano
                // printf("%c\n", c);
                numero1 = (c - '0')  + (numero1*10) ; //calcolo la somma del primo numero
                //printf("%d\n", numero1);
            }
            //printf("%d\n", numero1);
            for(j = 0; j < 2 && read(desc0, &c, 1); j++);   //lettura dei caratteri prima della parte che ci interessa dei numeri
            if(j < 2){
                //perror("errore lunghezza");
                exit(0);
            }
            numero2 = 0;
            while(read(desc0, &c, 1) && c >= '0' && c <= '9'){ //leggo i numeri che mi interesano
                //printf("%c\n", c);
                numero2 = (numero2*10) + (c - '0');//calcolo la somma del secondo numero
            }
            //printf("%d\n", numero2);
            int tot = numero1 + numero2;        //calcolo la somma totale
            snprintf(numero_stampato, 128,"%d\n", tot); //converto in stringa

            write(desc1, numero_stampato, strlen(numero_stampato)); //scrivo nella pipe
        }
    }
    close(desc0); //chiudo le pipe
    close(desc1);
}