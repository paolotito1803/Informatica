#include <stdio.h> 
#include <stdlib.h>
#include "SnakeInterattivo.h"
#include "ListCoordinate.h"

void trovaPercorsoDestra(struct labirinto* l)
{
    char comandoUltimaMossa = 'E';
    char* stringa_mosse = (char*)malloc(500 * sizeof(char));
    int nMosse = 0;
    l->mosse = 0;
    while (!l->vittoria)
    {
        switch (comandoUltimaMossa)
        {
        case 'E':
            if (muoviSerpente('S', l)) {
                comandoUltimaMossa = 'S';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'O';
                    l->mosse--;
                }
            }
            break;
        case 'S':
            if (muoviSerpente('O', l)) {
                comandoUltimaMossa = 'O';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'N';
                    l->mosse--;
                }
            }
            break;
        case 'O':
            if (muoviSerpente('N', l)) {
                comandoUltimaMossa = 'N';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'E';
                    l->mosse--;
                }
            }
            break;
        case 'N':
            if (muoviSerpente('E', l)) {
                comandoUltimaMossa = 'E';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'S';
                    l->mosse--;
                }
            }
            break;
        }
        if (l->mosse > nMosse)
        {
            stringa_mosse[nMosse] = comandoUltimaMossa;
            nMosse++;
            //StampaLabirinto(l);
        }
    }
    stringa_mosse[nMosse] = '\0';
    char* totale_mosse = (char*)realloc(stringa_mosse, l->mosse);
    

    if (l->vittoria)
    {
        printf("\nMosse: ");
        for (int i = 0; i < l->mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }
        printf("\n");
        StampaLabirinto(l);
        printVittoria(l);
        printf("\n");
    }
}


void trovaPercorsoSinistra(struct labirinto* l)
{
    char comandoUltimaMossa = 'E';
    char* stringa_mosse = (char*)malloc(500 * sizeof(char));
    int nMosse = 0;
    l->mosse = 0;
    while (!l->vittoria)
    {
        switch (comandoUltimaMossa)
        {
        case 'E':
            if (muoviSerpente('N', l)) {
                comandoUltimaMossa = 'N';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'O';
                    l->mosse--;
                }
            }
            break;
        case 'S':
            if (muoviSerpente('E', l)) {
                comandoUltimaMossa = 'E';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'N';
                    l->mosse--;
                }
            }
            break;
        case 'O':
            if (muoviSerpente('S', l)) {
                comandoUltimaMossa = 'S';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'E';
                    l->mosse--;
                }
            }
            break;
        case 'N':
            if (muoviSerpente('O', l)) {
                comandoUltimaMossa = 'O';
            }
            else {
                l->mosse--;
                if (!muoviSerpente(comandoUltimaMossa, l)) {
                    comandoUltimaMossa = 'S';
                    l->mosse--;
                }
            }
            break;
        }
        if (l->mosse > nMosse)
        {
            stringa_mosse[nMosse] = comandoUltimaMossa;
            nMosse++;
        }
    }
    stringa_mosse[nMosse] = '\0';
    char* totale_mosse = (char*)realloc(stringa_mosse, l->mosse);
    

    if (l->vittoria)
    {
        printf("\nMosse: ");
        for (int i = 0; i < l->mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }
        printf("\n");
        StampaLabirinto(l);
        printVittoria(l);
        printf("\n");
    }
}


void trovaPercorsoRandom(struct labirinto* l)
{
    int r = -1;
    //time_t t;
    char* totale_mosse = (char*)malloc(1000 * sizeof(char));
    int num_mosse = 0;
    while (!l->vittoria)
    {
        char comando = '_';
        //srand(time(t));
        r = rand() % 4;

        if (r == 0)
        {
            comando = 'N';
        }
        else if (r == 1)
        {
            comando = 'E';
        }
        else if (r == 2)
        {
            comando = 'S';
        }
        else if (r == 3)
        {
            comando = 'O';
        }
        totale_mosse[num_mosse] = comando;
        num_mosse++;
        muoviSerpente(comando, l);

    }

    char* stringa_mosse = (char*)realloc(totale_mosse, l->mosse);
    

    if (l->vittoria)
    {
        printf("\nMosse: ");
        for (int i = 0; i < l->mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }
        printf("\n");
        StampaLabirinto(l);
        printVittoria(l);
    }
}


typedef struct punteggio_source {
    int punteggio;
    int monete;

    char source;
} punteggio_source;


void calcolaPunteggi(struct labirinto* l, struct punteggio_source* /*int**/ arrayPunteggi, char ultimaMossa, int posRiga, int posColonna, int punteggioPrec, int monetePrec)
{
    char c = l->labirinto[posRiga * l->nC + posColonna];
    if (l->labirinto[posRiga * l->nC + posColonna] == '#' || posColonna < 0 || posRiga < 0 || posColonna > l->nC - 1 || posRiga > l->nR - 1)
    {
        return;
    }
    punteggioPrec--;

    if (arrayPunteggi[posRiga * l->nC + posColonna].punteggio > punteggioPrec)
    {
        return;
    }

    if (l->labirinto[posRiga * l->nC + posColonna] == '$')
    {
        monetePrec++;
    }
    else if (l->labirinto[posRiga * l->nC + posColonna] == '!')
    {
        monetePrec /= 2;
    }

    if (arrayPunteggi[posRiga * l->nC + posColonna].punteggio + arrayPunteggi[posRiga * l->nC + posColonna].monete * 10 > punteggioPrec + monetePrec * 10)
    {
        return;
    }

    //arrayPunteggi[posRiga * l->nC + posColonna] = punteggioPrec;
    arrayPunteggi[posRiga * l->nC + posColonna].punteggio = punteggioPrec;
    arrayPunteggi[posRiga * l->nC + posColonna].monete = monetePrec;
    arrayPunteggi[posRiga * l->nC + posColonna].source = ultimaMossa;

    calcolaPunteggi(l, arrayPunteggi, 'N', posRiga - 1, posColonna, punteggioPrec, monetePrec);
    calcolaPunteggi(l, arrayPunteggi, 'S', posRiga + 1, posColonna, punteggioPrec, monetePrec);
    calcolaPunteggi(l, arrayPunteggi, 'E', posRiga, posColonna + 1, punteggioPrec, monetePrec);
    calcolaPunteggi(l, arrayPunteggi, 'O', posRiga, posColonna - 1, punteggioPrec, monetePrec);
    
}



void trovaPercorsoRicorsivo(struct labirinto* l)
{
    struct punteggio_source* arrayPunteggi = malloc(sizeof(punteggio_source) * (l->nR*l->nC));
    //int* arrayPunteggi = malloc(sizeof(int) * (l->nR*l->nC));
    int r = l_get_riga(l->list_coordinateSerpente);
    int c = l_get_colonna(l->list_coordinateSerpente);

    calcolaPunteggi(l, arrayPunteggi, '0', r, c, 1001, 0);

    int posArrivoRiga;
    int posArrivoColonna;
    //Trova carattere di arrivo
    for (size_t i = 0; i < (l->nR); i++)
    {
        for (size_t j = 0; j < l->nC; j++)
        {
            if (l->labirinto[i * l->nC + j] == l->carattereDiArrivo)
            {
                posArrivoRiga = i;
                posArrivoColonna = j;
            }
        }
    }

    int posRiga = posArrivoRiga;
    int posColonna = posArrivoColonna;

    char* arrayMosseRovescio = malloc(sizeof(char) * (l->nR * l->nC));
    int n = 0;
    while (posRiga != r || posColonna != c)
    {
        char mossa = arrayPunteggi[posRiga * l->nC + posColonna].source;
        arrayMosseRovescio[n++] = mossa;

        switch (mossa)
        {
            case 'N':
                posRiga++;
                break;
            case 'E':
                posColonna--;
                break;
            case 'S':
                posRiga--;
                break;
            case 'O':
                posColonna++;
                break;
            default:
                break;
        }
    }

    char* arrayMosse = malloc(sizeof(char) * (n));
    printf("\nMosse: ");
    for (size_t i = 0; i < n; i++)
    {
        arrayMosse[i] = arrayMosseRovescio[n - i - 1];

        printf("%c", arrayMosse[i]);

        muoviSerpente(arrayMosse[i], l);
        //StampaLabirinto(l);
    }
    printf("\n");
    StampaLabirinto(l);
    printVittoria(l);

}

