#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>
#include <unistd.h>
#include <semaphore.h>


//in questa soluzione mi dichiaro due semafori, un mutex e in sem per i tipi delle palline e un counter per le 20 paline e il tipo
//nella funzione inizializza vado ad inizializzare i due semafori, il mutex  a 1 e sem con un for per i tipi fino a 20 palline
//nella funzione distruggi utilizzo sem_destroy per distruggere i due semafori, sem lo metto all'interno di un ciclo for in modo da eliminare ogni cella
//nella entra_imbuto mi dichiaro una variabile t dove dopo faccio uno switch per controllare che i tipi siano corretti con quelli richiesti e in ogni caso faccio la wait di sem[t]
//in esci_imbuto utilizzo il mutex in modo da non avere race condition e aumento il numero di uscite poi controllo se sono uguali a 20 e in tal caso
//faccio un ciclo for fino a 20 dove riapro l'imbuto con la post di sem[type]. Alla fine del ciclo azzero le uscite e riapro il mutex


sem_t sem[4]; // semafori per ogni tipo di pallina
sem_t mutex; // semaforo per la sezione critica
int count = 0; // numero di palline che sono uscite dall'imbuto
int type = 0; // tipo di pallina nell'imbuto

void inizializza_sem() {
    for(int i = 0; i < 4; i++) {
        sem_init(&sem[i], 0, i == 0 ? 20 : 0); // inizializza i semafori
    }
    sem_init(&mutex, 0, 1); // inizializza il semaforo per la sezione critica
}

void distruggi_sem() {
    for(int i = 0; i < 4; i++) {
        sem_destroy(&sem[i]); // distruggi i semafori
    }
    sem_destroy(&mutex); // distruggi il semaforo per la sezione critica
}

void entra_imbuto(char cb) {
    int t;
    switch(cb) {
        case 'O': t = 0; break;
        case '-': t = 1; break;
        case '+': t = 2; break;
        case '2': t = 3; break;
    }
    sem_wait(&sem[t]); // attende di entrare in imbuto
}

void esci_imbuto() {
    sem_wait(&mutex); // entra nella sezione critica
    count++;
    if(count == 20) { // se sono uscite 20 palline
        count = 0;
        type = (type + 1) % 4; // cambia il tipo di pallina
        for(int i = 0; i < 20; i++) {
            sem_post(&sem[type]); // sblocca il gruppo successivo
        }
    }
    sem_post(&mutex); // esce dalla sezione critica
}