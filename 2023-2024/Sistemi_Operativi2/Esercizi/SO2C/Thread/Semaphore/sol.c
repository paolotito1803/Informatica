#include<stdio.h>
#include <semaphore.h>
#define N_SNAKES 5

/*
 * In questa soluzione vado ad utilizzare due semafori in quanto mi servono per poter leggere e scrivere i caratteri, come con il
 * produttore e consumatore.
 * Nella initi_sem inizializzo cella per cella degli array inizialmente a 0 e poi verranno incrementati e decrementati nel resto del codice
 * Nella destroy_sem distruggo cella per cella i semafori
 * Mentre in invia_char inizializzo il buffer di caratteri della posizione del serpente data il valore c e diminuisco il numero di caratteri
 * disposibili per la lettura con una wait in pieno al contrario nella leggi_char incremento il numero di caratteri da leggere su vuoto.
 * In leggi_char devo aumentare il numero di caratteri da leggere quindi uso la wait su vuoti in quanto non ho ancora caratteri da poter leggere
 * Nella funzione fatta_lettura decremento il numero di caratteri da leggere di vuoto in quanto libero una cella per volta
 */

// variabili globali e semafori qui
char buffer[N_SNAKES]; //buffer per i caratteri che può prendere uno snake
sem_t pieno[N_SNAKES], vuoto[N_SNAKES]; //semafori per poter legegre e scrivere
sem_t mutex;
// invocato all'inizio dal thread principale prima di creare gli snake
void init_sem() {
    for(int i = 0; i < N_SNAKES; i++){
        sem_init(&pieno[i], 0, 0);
        sem_init(&vuoto[i], 0, 0);
    }
}

// invocato dal thread prima della terminazione del programma
void destroy_sem() {
    for(int i = 0; i < N_SNAKES; i++){
        sem_destroy(&vuoto[i]);
        sem_destroy(&pieno[i]);
    }
}

// invia un carattere al thread id
void invia_char(int id, char c) {
    buffer[id] = c;
    sem_post(&pieno[id]); //dico che il buffer è pieno
}

// il thread id legge un carattere (bloccante se il carattere non è stato inviato)
char leggi_char(int id) {
    sem_wait(&pieno[id]); //consumo i caratteri del buffer
    return buffer[id];
}

// attende che il thread id abbia letto
void attendi_lettura(int id) {
    sem_wait(&vuoto[id]); //faccio una wait per attendere una lettura, eseguo la P
}

// il thread id segnala che la lettura è avvenuta
void fatta_lettura(int id) {
    sem_post(&vuoto[id]); //essendo che la lettura è avvenuta devo decrementare il contatore sul buffer vuoto dei caratteri letti
}