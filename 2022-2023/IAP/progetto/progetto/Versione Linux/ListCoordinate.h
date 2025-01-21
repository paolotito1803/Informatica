#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> 

/**
*@file ListCoordinate.h
* @author Paolo, Leonardo, Giacomo
* @brief in questo file sono presenti le funzioni necessarie per il funzionamento di una lista, che viene utilizzata per le
*coordinate del serpente
* 
**/
typedef struct list list_coordinate;
/**
* @param    l_orig è la lista dove sono inserite le coordinate già percorse
* è presente l'algoritmo che fa mantenere la destra del labirinto al serpente
* La funzione serve per creare il nodo con le coordinate attraversate dal serpente
**/
list_coordinate* l_create(int riga, int colonna);
/**
* @param    l_orig è la lista dove sono inserite le coordinate già percorse
* è presente l'algoritmo che fa mantenere la destra del labirinto al serpente
* La funzione serve per creare i nuovi nodi alla lista
**/
void l_enqueue(list_coordinate** l_orig, int riga, int colonna);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
* è presente l'algoritmo che fa mantenere la destra del labirinto al serpente
* La funzione serve per cancellare i nodi precedentemente creati
**/
void l_dequeue(list_coordinate** l_coordinate);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
* Verifica se in quella coordinata è già passato il serpente 
**/
bool l_contains(list_coordinate* l_coordinate, int riga, int colonna);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
* Verifica quale è stata l'ultima coordinata del serpente 
**/
bool l_isLast(list_coordinate* l_coordinate, int riga, int colonna);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
* Funzioni che servono per ottenere la riga dell'ultima coordinata 
**/
int l_getLast_riga(list_coordinate* l_coordinate);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
* Funzioni che servono per ottenere la colonna dell'ultima coordinata 
**/
int l_getLast_colonna(list_coordinate* l_coordinate);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
*  
**/
int l_get_riga(list_coordinate* l_coordinate);
/**
* @param    l_coordinate è la lista dove sono inserite le coordinate
*  
**/
int l_get_colonna(list_coordinate* l_coordinate);