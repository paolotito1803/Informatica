
#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>
#include "ListCoordinate.h"

struct labirinto
{
    //Dati l->labirinto (matrice)
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




//funzione muovi serpente totale
void muoviSnakeTotale(struct labirinto* l, int riga, int colonna)
{
    l_enqueue(&(l->list_coordinateSerpente), riga, colonna);
    l_dequeue(&(l->list_coordinateSerpente));
}

//funzione taglia serpente
void tagliaSnake(struct labirinto* l, int riga, int colonna)
{
    bool check = false;
    for (int i = 0; i < l->lunghezzaSerpente && check == false; i++)
    {
        if (l_get_riga(l->list_coordinateSerpente) != riga || l_get_colonna(l->list_coordinateSerpente) != colonna)
        {
            l_dequeue(&(l->list_coordinateSerpente));
            l->lunghezzaSerpente--;
            check = true;
        }
    }
    if (check)
    {
        l_dequeue(&(l->list_coordinateSerpente));
        l->lunghezzaSerpente--;
    }
}



//funzione dimezza snake
void dimezzaSnake(struct labirinto* l, int riga, int colonna)
{
    if (l->lunghezzaSerpente > 1)
    {
        int nStart = l->lunghezzaSerpente / 2;
        for (size_t i = 0; i < l->lunghezzaSerpente - nStart; i++)
        {
            l_dequeue(&(l->list_coordinateSerpente));
            //l->coordinateSerpente[i] = l->coordinateSerpente[i + nStart];
        }
        //l->coordinateSerpente = realloc(l->coordinateSerpente, sizeof(struct coordinate) * nStart);
        l->lunghezzaSerpente = nStart;
    }
}


//funzione allungamento snake
void allungaSnake(struct labirinto* l, int riga, int colonna)
{
    l_enqueue(&(l->list_coordinateSerpente), riga, colonna);
    (l->lunghezzaSerpente)++;
}

bool verificaCoordinataSerpente(struct labirinto* l, int riga, int colonna) {

    return l_contains(l->list_coordinateSerpente, riga, colonna);

}

bool verificaTestaSerpente(struct labirinto* l, int riga, int colonna) {

    return l_isLast(l->list_coordinateSerpente, riga, colonna);
}





void StampaLabirinto(struct labirinto* l)
{
    for (int i = 0; i < l->nR; i++) //Righe
    {
        for (int j = 0; j < l->nC; j++) ///Colonne
        {
            if (l->labirinto[i * l->nC + j] == ' ')
            {
                if (verificaCoordinataSerpente(l, i, j))
                {
                    if (verificaTestaSerpente(l, i, j))
                    {
                        printf("o");
                    }
                    else
                    {
                        printf("%c", 248);
                    }
                }
                else if (l_contains(l->list_movimenti, i, j))
                {
                    printf(".");
                }
                else
                {
                    printf(" ");
                }
            }
            else
            {
                printf("%c", l->labirinto[i * l->nC + j]);
            }
        }
        printf("\n");
    }


}

void AggiornaPunteggio(struct labirinto* l, int posRiga, int posColonna) {
    l_enqueue(&(l->list_movimenti), posRiga, posColonna);
    l->punteggio--;
    if (l->labirinto[posRiga * l->nC + posColonna] == '$')
    {
        allungaSnake(l, posRiga, posColonna);
        l->sommaMonete++;
    }
    else if (l->labirinto[posRiga * l->nC + posColonna] == '!')
    {
        muoviSnakeTotale(l, posRiga, posColonna);
        dimezzaSnake(l, posRiga, posColonna);

        l->sommaMonete = l->sommaMonete / 2;
    }
    else
    {
        if (verificaCoordinataSerpente(l, posRiga, posColonna))
        {
            tagliaSnake(l, posRiga, posColonna); //richismo funzione tsgliaSnake di riga 58
        }
        muoviSnakeTotale(l, posRiga, posColonna);
    }

    if (l->labirinto[posRiga * l->nC + posColonna] == 'T')
    {
        l->trapano += 3;
    }
}

int muoviSerpente(char letteraCoordinate, struct labirinto* l)
{
    int esitoMossa = 0;
    l->mosse++;
    int posRiga = l_getLast_riga(l->list_coordinateSerpente);
    int posColonna = l_getLast_colonna(l->list_coordinateSerpente);

    int posRigaEx = posRiga;
    int posColonnaEx = posColonna;
    if (letteraCoordinate == 'N')
        posRiga--;
    else if (letteraCoordinate == 'E')
        posColonna++;
    else if (letteraCoordinate == 'S')
        posRiga++;
    else if (letteraCoordinate == 'O')
        posColonna--;


    l->labirinto[posRigaEx * l->nC + posColonnaEx] = ' ';
    if (l->trapano > 0)
    {
        if (l->labirinto[posRiga * l->nC + posColonna] == '#' && (posRiga >= 1 && posColonna >= 1 && posRiga < l->nR - 1 && posColonna < l->nC - 1))
        {
            l->trapano--;
            l->labirinto[posRiga * l->nC + posColonna] = ' ';
        }
    }

    if (l->labirinto[posRiga * l->nC + posColonna] != '#' && (posRiga >= 0 && posColonna >= 0 && posRiga < l->nR && posColonna < l->nC))
    {
        esitoMossa = 1;
        AggiornaPunteggio(l, posRiga, posColonna);
    }


    if (l->labirinto[posRiga * l->nC + posColonna] == l->carattereDiArrivo)
    {
        l->vittoria = 1;
    }

    if (esitoMossa == 1)
    {
        l->labirinto[posRiga * l->nC + posColonna] = ' ';
    }
    return esitoMossa;
}



void printVittoria(struct labirinto* l) {
    if (l->vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", l->mosse);
        printf("Punteggio Finale: %d\n", l->punteggio + l->sommaMonete * 10);
        
    }
}

void loopCoordinate(struct labirinto* l)
{
    l->mosse = 0;
    char letteraCoorsinate = 'z';

    scanf("%c", &letteraCoorsinate);
    while (letteraCoorsinate != 'z')
    {
        if (letteraCoorsinate != '\n')
        {
            muoviSerpente(letteraCoorsinate, l);
            StampaLabirinto(l);
        }

        if (!l->vittoria)
        {
            scanf("%c", &letteraCoorsinate);
        }
        else
        {
            letteraCoorsinate = 'z';
        }
    }

    printVittoria(l);

}