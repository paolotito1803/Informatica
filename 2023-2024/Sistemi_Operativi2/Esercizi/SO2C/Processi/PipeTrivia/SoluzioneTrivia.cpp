#include <fcntl.h>
#include <sys/types.h>
#include <sys/uio.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

/*L'idea risolutiva è quella di aprire le pipe in lettura e scrittura per poi ciclare fino alla fine della stringa e leggere e scrivere il risultato nella pipe
Più precisamente quello che viene fatto è la lettura della prima parte della stringa in cui non è presente il colore,
successivamente attraverso il primo ciclo while(dopo il for) viene letto il colore dalla pipe e scritto dalla pipe in una variabile (la stessa che uso per leggere),
per concludere con l'ultimo ciclo while andiamo fino alla fine della stringa quindi finchè non troviamo il '?', ovviamente tutto ciò che viene letto non va all'interno della
stringa che abbiamo creato in cui è stato salvato il colore*/

int main(){
    int desc0, desc1;
    char c;
    char nuova_stringa;
    int i;

    desc0 = open("/tmp/pipeOut", O_RDONLY);
    desc1 = open("/tmp/pipeIn", O_WRONLY);

    if(desc0 <0 || desc1 < 0){
        perror("errore apertura pipe");
        exit(1);
    }
    else{
        while(1){
            for(i = 0; i < 28 && read(desc0, &c, 1); i++); //lettura dei caratteri prima della parte che ci interessa per il colore
            if(i < 28)
                exit(0); //dice che non siamo ancora entrati nella parte del colore

            //inizio a leggere i caratteri del colore, controllando che le lettere siano veramente lettere e non numri, in caso opposto non entra nel while

            while(read(desc0, &c, 1) && c >= 'a' && c <= 'z'){ //leggo dalla pipe un solo carattere per volta in modo da poter dire se è corretto o meno il carattere per un colore
                write(desc1, &c, 1); //scrive nella pipe il carattere appena letto, che ovviamente soddisfa la guardia del while
            }

            //leggo i caratteri rimanenti della stringa, quelli che non riguardano i colori
            while(read(desc0, &c, 1) && c != '?');
        }
    }
    close(desc0);
    close(desc1);
}