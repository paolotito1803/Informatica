/*
 * Corso di Sistemi Operativi 2020
 * Schema soluzione seconda verifica: semafori
 *
 * Author: Riccardo Focardi
 */

#include <semaphore.h>

// dichiarazione semafori e variabili globali
sem_t imbuto;
sem_t mutex;
int num_uscite = 0;
int N = 0;

// inizializza semafori e variabili
// ATTENZIONE dim è la dimensione del gruppo che deve entrare
// nell'imbuto.
void inizializza_sem(int dim) {
    N = dim;
    num_uscite = 0;
    sem_init(&imbuto, 0, N);
    sem_init(&mutex, 0, 1);
}

// distruggi i semafori
void distruggi_sem() {
    sem_destroy(&imbuto);
    sem_destroy(&mutex);
}

// attende di entrare nell'imbuto
void entra_imbuto() {
    sem_wait(&imbuto);

}

// esce dall'imbuto
// ATTENZIONE usare una variabile intera condivisa per sapere
// quante palline sono uscite (da proteggere con una sezione critica)!
void esci_imbuto() {
    sem_wait(&mutex); //uso per proteggere la sezione critica, lo faccio diventare 0 in modo che nessuno entri
    num_uscite++;
    if(num_uscite == N){
        for(int i = 0; i < N; i++){
            sem_post(&imbuto);
        }
        num_uscite = 0;
    }
    sem_post(&mutex);
}

