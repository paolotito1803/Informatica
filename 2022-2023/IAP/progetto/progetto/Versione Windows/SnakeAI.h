/**
* @file SnakeAI.h
* @author Paolo, Leonardo, Giacomo
* @brief   In questa sezione l'algoritmo della parte di intelligenza artigiciale del progetto
*
* 
*
* 
**/
#include <stdio.h>
#include <stdlib.h>
/**
* @param    l è la struct dove sono inseriti i dati del labirinto
*In questa funzione è presente l'algoritmo che fa mantenere la destra del labirinto al serpente
* 
**/
void trovaPercorsoDestra(struct labirinto* l);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto
*In questa funzione è presente l'algoritmo che fa mantenere la sinistra del labirinto al serpente
* 
**/
void trovaPercorsoSinistra(struct labirinto* l);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto
*In questa funzione è presente l'algoritmo che fa fare casualmente il percorso al serpente
* 
**/
void trovaPercorsoRandom(struct labirinto* l);
/**
* @param    l è la struct dove sono inseriti i dati del labirinto
*In questa funzione è presente l'algoritmo ricorsivo che in base i punteggi attribuiti ad ogni movimento
*stabilisce il percorso migliore
* 
**/
void trovaPercorsoRicorsivo(struct labirinto* l);