// 898059 897270 895227

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>

struct labirinto
{
    //Dati (*l).labirinto (matrice)
    char* labirinto;
    int nR;
    int nC;

    //Posizione in tempo reale dello snake
    /*int snakePositionRiga;
    int snakePositionColonna;*/

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

    struct coordinate *coordinateSerpente;
    int lunghezzaSerpente;
};

struct coordinate
{
    int riga;
    int colonna;
};


//funzione muovi serpente totale
void muoviSnakeTolate(struct labirinto* l, int riga, int colonna)
{
    //va da aggiungere alla fine e il primo scomare
    for (size_t i = 0; i < l->lunghezzaSerpente - 1; i++)
    {
        l->coordinateSerpente[i] = l->coordinateSerpente[i + 1];
    }
    l->coordinateSerpente[l->lunghezzaSerpente - 1].riga = riga;
    l->coordinateSerpente[l->lunghezzaSerpente - 1].colonna = colonna;
}

//funzione taglia serpente
void tagliaSnake(struct labirinto* l, int riga, int colonna)
{
    bool check = false;
    for (int i = 0; i < l->lunghezzaSerpente && check == false; i++)
    {
        if (l->coordinateSerpente[i].riga == riga && l->coordinateSerpente[i].colonna == colonna)
        {
            for (size_t j = 0; j < l->lunghezzaSerpente - i; j++)
            {
                l->coordinateSerpente[j] = l->coordinateSerpente[j + i];
            }
            l->lunghezzaSerpente = (l->lunghezzaSerpente - (i));
            l->coordinateSerpente = realloc(l->coordinateSerpente, sizeof(struct labirinto) * l->lunghezzaSerpente);
            check = true;
        }
    }
}



//funzione dimezza snake
void dimezzaSnake(struct labirinto* l, int riga, int colonna)
{
    if (l->lunghezzaSerpente > 1)
    {
        int nStart = l->lunghezzaSerpente / 2;
        for (size_t i = 0; i < l->lunghezzaSerpente - 1; i++)
        {
            l->coordinateSerpente[i] = l->coordinateSerpente[i + nStart];
        }
        l->coordinateSerpente = realloc(l->coordinateSerpente, sizeof(struct labirinto) * nStart);
        l->lunghezzaSerpente = nStart;
    }
}


//funzione allungamento snake
void allungaSnake(struct labirinto *l, int riga, int colonna)
{
    if (l->lunghezzaSerpente == 0)
    {
        l->coordinateSerpente = malloc(sizeof(struct labirinto));
        l->coordinateSerpente[0].riga = riga;
        l->coordinateSerpente[0].colonna = colonna;
        l->lunghezzaSerpente++;
    }
    else
    {
        l->coordinateSerpente = realloc(l->coordinateSerpente, sizeof(struct labirinto) * (l->lunghezzaSerpente++));
        l->coordinateSerpente[l->lunghezzaSerpente - 1].riga = riga;
        l->coordinateSerpente[l->lunghezzaSerpente - 1].colonna = colonna;
    }
}

bool verificaCoordinataSerpente(struct labirinto* l, int riga, int colonna) {
    
    for (size_t i = 0; i < l->lunghezzaSerpente; i++)
    {
        if (l->coordinateSerpente[i].riga == riga && l->coordinateSerpente[i].colonna == colonna)
        {
            return true;
        }
    }

    return false;
}

bool verificaTestaSerpente(struct labirinto* l, int riga, int colonna) {

    int r = l->coordinateSerpente[l->lunghezzaSerpente - 1].riga;
    int c = l->coordinateSerpente[l->lunghezzaSerpente - 1].colonna;
    return r == riga && c == colonna;
}





void StampaLabirinto(struct labirinto* l)
{
    for (int i = 0; i < (*l).nR; i++) //Righe
    {
        for (int j = 0; j < (*l).nC; j++) ///Colonne
        {
            if ((*l).labirinto[i * (*l).nC + j] == ' ')
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
                else
                {
                    printf(" ");
                }
            }
            else
            {
                printf("%c", (*l).labirinto[i * (*l).nC + j]);
            }
        }
        printf("\n");
    }


}

void AggiornaPunteggio(struct labirinto* l, int posRiga, int posColonna) {
    
    if ((*l).labirinto[posRiga * (*l).nC + posColonna] == '$') 
    {
        allungaSnake(l, posRiga, posColonna);
        (*l).punteggio += 10;
    }
    else if ((*l).labirinto[posRiga * (*l).nC + posColonna] == '!') 
    {
        muoviSnakeTolate(l, posRiga, posColonna);
        dimezzaSnake(l, posRiga, posColonna);
        (*l).punteggio = (*l).punteggio / 2;
    }
    else 
    {
        if (verificaCoordinataSerpente(l, posRiga, posColonna))
        {
            tagliaSnake(l, posRiga, posColonna); //richismo funzione tsgliaSnake di riga 58
        }
        muoviSnakeTolate(l, posRiga, posColonna);
        (*l).punteggio--;
    }

    if ((*l).labirinto[posRiga * (*l).nC + posColonna] == 'T')
    {
        (*l).trapano += 3;
    }
}

int muoviSerpente(char letteraCoordinate, struct labirinto* l)
{
    int esitoMossa = 0;
    (*l).mosse++;
    int posRiga = l->coordinateSerpente[l->lunghezzaSerpente - 1].riga;
    int posColonna = l->coordinateSerpente[l->lunghezzaSerpente - 1].colonna;
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


    (*l).labirinto[posRigaEx * (*l).nC + posColonnaEx] = ' ';
    if ((*l).trapano > 0)
    {
        if ((*l).labirinto[posRiga * (*l).nC + posColonna] == '#' && (posRiga >= 1 && posColonna >= 1 && posRiga < (*l).nR - 1 && posColonna < (*l).nC - 1))
        {
            (*l).trapano--;
            (*l).labirinto[posRiga * (*l).nC + posColonna] = ' ';
        }
    }

    if ((*l).labirinto[posRiga * (*l).nC + posColonna] != '#' && (posRiga >= 0 && posColonna >= 0 && posRiga < (*l).nR && posColonna < (*l).nC))
    {
        /*(*l).snakePositionColonna = posColonna;
        (*l).snakePositionRiga = posRiga;*/


        esitoMossa = 1;
        AggiornaPunteggio(l, posRiga, posColonna);
    }


    if ((*l).labirinto[posRiga * (*l).nC + posColonna] == (*l).carattereDiArrivo)
    {
        (*l).vittoria = 1;
    }

    if (esitoMossa == 1)
    {
        (*l).labirinto[posRiga * (*l).nC + posColonna] = ' ';
    }

    //(*l).labirinto[(*l).snakePositionRiga * (*l).nC + (*l).snakePositionColonna] = ' ';
    return esitoMossa;
}



void loopCoordinate(struct labirinto* l)
{
    (*l).mosse = 0;
    char letteraCoorsinate = 'z';

    scanf("%c", &letteraCoorsinate);
    while (letteraCoorsinate != 'z')
    {
        if (letteraCoorsinate != '\n')
        {
            muoviSerpente(letteraCoorsinate, l);
            StampaLabirinto(l);
        }

        if (!(*l).vittoria)
        {
            scanf("%c", &letteraCoorsinate);
        }
        else
        {
            letteraCoorsinate = 'z';
        }
    }

    if ((*l).vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", (*l).mosse);
        printf("Punteggio Finale: %d\n", (*l).punteggio);
    }

}

void trovaPercorsoDestra(struct labirinto* l)
{
    char comandoUltimaMossa = 'E';
    char* stringa_mosse = (char*)malloc(500 * sizeof(char));
    int nMosse = 0;
    (*l).mosse = 0;
    while (!(*l).vittoria)
    {
        switch (comandoUltimaMossa)
        {
        case 'E':
            if (muoviSerpente('S', l)) {
                comandoUltimaMossa = 'S';
            }
            else {
                (*l).mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'O';
                    (*l).mosse--;
                }
            }
            break;
        case 'S':
            if (muoviSerpente('O', l)) {
                comandoUltimaMossa = 'O';
            }
            else {
                (*l).mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'N';
                    (*l).mosse--;
                }
            }
            break;
        case 'O':
            if (muoviSerpente('N', l)) {
                comandoUltimaMossa = 'N';
            }
            else {
                (*l).mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'E';
                    (*l).mosse--;
                }
            }
            break;
        case 'N':
            if (muoviSerpente('E', l)) {
                comandoUltimaMossa = 'E';
            }
            else {
                (*l).mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'N';
                    (*l).mosse--;
                }
            }
            break;
        }
        if ((*l).mosse > nMosse)
        {
            stringa_mosse[nMosse] = comandoUltimaMossa;
            nMosse++;
            //StampaLabirinto(l);
        }
    }
    stringa_mosse[nMosse] = '\0';
    char* totale_mosse = (char*)realloc(stringa_mosse, (*l).mosse);
    //StampaLabirinto(l);

    if ((*l).vittoria)
    {
        //printf("Hai vinto!!!\n");
        //printf("Totale mosse: %d\n", mosse);
        //printf("Punteggio Finale: %d\n",(*l).punteggio);

        for (int i = 0; i < (*l).mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }
        printf("\n");
    }
}

int main(int argc, char* argv[])
{
    //Variabili
    size_t M = 0;
    size_t N = 0;
    char app[] = "--challenge";

    scanf("%ld", &M);
    scanf("%ld", &N);

    char* lab = malloc(sizeof(char) * N * M);
    struct labirinto l;
    {
        l.labirinto = lab;
        l.nR = N;
        l.nC = M;
        l.punteggio = 1000;
        l.vittoria = 0;
        l.mosse = 0;
        l.sommaMonete = 0;
        l.trapano = 0;
        l.carattereDiArrivo = '_';
        l.carattereSnake = 'o';
        l.lunghezzaSerpente = 0;
    }


    char c;
    for (int i = 0; i < (N); i++)
    {
        for (int j = 0; j < (M); j++)
        {
            scanf("%c", &c);
            //printf("%c", c);
            if (c == '\n')
            {
                j--;
            }
            else
            {
                l.labirinto[i * M + j] = c;
                if (c == l.carattereSnake)
                {
                    /*l.snakePositionRiga = i;
                    l.snakePositionColonna = j;*/

                    allungaSnake(&l, i, j);
                }
            }
        }
    }

    if (argc > 1 && strcmp(argv[1], app) == 0)
    {
        trovaPercorsoDestra(&l);
        //StampaLabirinto(labirinto, nR, nC);
    }
    else
    {
        printf("Modalita' manuale attiva, scrivere il percorso:\n");
        loopCoordinate(&l);
    }

    return 0;
}

/*
19
10
###################
o    #          $ #
#    #          $ #
#    #   !  #   $ #
#    #      #   $ #
#    #      #     _
#    #      #     #
#           #     #
# T  $$$$   #     #
###################


19
10
###################
o    #          $ #
#    #          $ #
#    #   !  #   $ #
#    #      #   $ #
#    #      #     _
#    #      #     #
#           #     #
# T$$$$$$$  #     #
###################
       o���
  ���������
       ����
       o���
*/