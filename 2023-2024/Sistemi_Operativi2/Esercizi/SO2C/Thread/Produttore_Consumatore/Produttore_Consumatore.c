#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/syscall.h>   /* For SYS_xxx definitions */
#include <semaphore.h>
#define MAX 10
sem_t mutex, pieno, vuoto;
int inserisci = 0, preleva = 0;
int buffer[MAX];
int d;
void* Produttore() {
    for(int k = 0; k < MAX; k++) {
        printf("ho prodotto %D\n", k);
    sem_wait(&vuoto); //P(vuote); // richiede una cella vuota
        sem_wait(&mutex); //P(mutex); // entra in sezione critica
    buffer[inserisci] = -1;
    inserisci = (inserisci+1) % MAX;
    sem_post(&mutex); //V(mutex); // esce dalla sezione critica
        sem_post(&pieno); //V(piene); // rilascia una cella piena
    }
}

void* Consumatore() {
    for(int l = 0; l < MAX; l++) {
        sem_wait(&pieno); //P(piene); // richiede una cella piena
        sem_wait(&mutex);//P(mutex); // entra in sezione critica
            d = buffer[preleva];
            preleva = (preleva+1) % MAX;
        sem_post(&mutex);//V(mutex); // esce dalla sezione critica
        sem_post(&vuoto);//V(vuote); // rilascia una cella vuota
            printf("ho consumato %d\n", l);
    }
}