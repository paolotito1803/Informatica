#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>
#include "ListCoordinate.h"
/**
* @file SnakeInterattivo.h
* @author Paolo, Leonardo, Giacomo
* @brief   In questa sezione sono presenti tutte le funzioni che riguardano la parte interativa del progetto
*come il movimento,calcolo del punteggio, mosse eseguibili, imprevisti e monete e gli effetti sullo Snake
* 
*
* 
**/
struct labirinto
{
    //Dati (*l).labirinto (matrice)
    char* labirinto;
    int nR;
    int nC;


    //Punteggi
    int punteggio;
    int vittoria; //Variabile che viene modificata quando lo snake e' arrivato al traguardo
    int mosse;
    int sommaMonete;
    int trapano;

    //Carattere "speciale" di arrivo
    char carattereDiArrivo;
    //Carattere "speciale" per indicare lo snake
    char carattereSnake;

    int lunghezzaSerpente;

    list_coordinate* list_coordinateSerpente;
    list_coordinate* list_movimenti;
};

/**
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
*  funzione muovi serpente totale
* va da aggiungere alla fine e il primo scompare
**/
void muoviSnakeTotale(struct labirinto* l, int riga, int colonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
*  funzione taglia serpente viene utilizzata quando , tornando indietro, si passa su una coordinata già occupata da sè stesso  
**/
void tagliaSnake(struct labirinto* l, int riga, int colonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
*  funzione dimezza serpente 
* questa funzione entra in azione quando il serpente va a contatto con l'imprevisto '!', dimezzandone la lunghezza
**/
void dimezzaSnake(struct labirinto* l, int riga, int colonna);
/**
* 
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
*  funzione allunga serpente 
* viene eseguita quanto il giocatore fa prendere al serpente la moneta '$' allungando di conseguenza il serpente**/
void allungaSnake(struct labirinto *l, int riga, int colonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
**/
bool verificaCoordinataSerpente(struct labirinto* l, int riga, int colonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, riga e colonna rappresentano le coordinate aggiuntivi del serpente
**/
bool verificaTestaSerpente(struct labirinto* l, int riga, int colonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto
*  funzione che stampa il labirinto ogni volta che viene chiamata
**/
void StampaLabirinto(struct labirinto* l);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, posRiga e posColonna sono le coordinate della posizione del serpente
*  funzione che aggiorna il punteggio ogni votla che viene eseguita una mossa (-1), presa una moneta '$' (+10) oppure un imprevisto '!' (dimezza)
* 
**/
void AggiornaPunteggio(struct labirinto* l, int posRiga, int posColonna);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto, letteraCoordinate è la mossa che prova a fare l'utente o l'AI
* 
**/
int muoviSerpente(char letteraCoordinate, struct labirinto* l);
/**
* 
* @param    l è la struct dove sono inseriti i dati del labirinto
*  funzione serve per stamapare il risultato e i punteggi.
* 
**/
void printVittoria(struct labirinto* l);
/**
* 
* @param    l è la struct dove sono inseriti i dati del labirinto
*  funzione serve per la modalità interattiva
* 
**/
void loopCoordinate(struct labirinto* l);