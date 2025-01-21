#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// Leonardo = 898059, Giacomo = 897270,  Paolo = 895227

int snakePositionRiga = 1;
int snakePositionColonna = 0;
int punteggio = 1000;
char carattereDiArrivo = '_';
int vittoria = 0;

int mosse = 0;
int sommaMonete = 0;


void StampaLabirinto(char * labirinto, int nR, int nC)
{
    for (int i = 0; i < nR; i++) //Righe
    {
        for (int j = 0; j < nC; j++) ///Colonne
        {
            if (labirinto[i * nC + j] == ' ')
            {
                printf(" ");
            }
            else
            {
                printf("%c", labirinto[i * nC + j]);
            }
        }
        printf("\n");
    }


}

void AggiornaPunteggio(int posRiga, int posColonna, char *labirinto, int nR, int nC) {
    if (labirinto[posRiga * nC + posColonna] == '$') {
        punteggio += 10;
    }
    else if (labirinto[posRiga * nC + posColonna] == '!') {
        punteggio = punteggio / 2;
    }
    else {
        punteggio++;
    }
}

int muoviSerpente(char letteraCoordinate, char* labirinto, int nR, int nC)
{
    int esitoMossa = 0;
    mosse++;
    int posRiga = snakePositionRiga;
    int posColonna = snakePositionColonna;
    if (letteraCoordinate == 'N')
        posRiga--;
    else if (letteraCoordinate == 'E')
        posColonna++;
    else if (letteraCoordinate == 'S')
        posRiga++;
    else if (letteraCoordinate == 'O')
        posColonna--;


    labirinto[snakePositionRiga * nC + snakePositionColonna] = '.';
    if (labirinto[posRiga * nC + posColonna] != '#' && posRiga > 0)
    {
        snakePositionColonna = posColonna;
        snakePositionRiga = posRiga;
        esitoMossa = 1;
        AggiornaPunteggio(posRiga, posColonna, labirinto, nR, nC);
    }

    if (labirinto[posRiga * nC + posColonna] == carattereDiArrivo)
    {
        vittoria = 1;
    }

    labirinto[snakePositionRiga * nC + snakePositionColonna] = 'o';
    return esitoMossa;
}

void loopCoordinate(char* labirinto, int nR, int nC)
{
    mosse = 0;
    char letteraCoorsinate = 'z';

    scanf("%c", &letteraCoorsinate);
    while (letteraCoorsinate != 'z')
    {
        if (letteraCoorsinate != '\n')
        {
            muoviSerpente(letteraCoorsinate, labirinto, nR, nC);
        }

        if (!vittoria)
        {
            scanf("%c", &letteraCoorsinate);
        }
        else
        {
            letteraCoorsinate = 'z';
        }
        //StampaLabirinto();
    }

    if (vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", mosse);
        printf("Punteggio Finale: %d\n", punteggio);
    }

}

void trovaPercorsoDestra(char* labirinto, int nR, int nC)
{
    char comandoUltimaMossa = 'E';
    char* stringa_mosse = (char*)malloc(500 * sizeof(char));
    int nMosse = 0;
    mosse = 0;
    while (!vittoria)
    {
        switch (comandoUltimaMossa) 
        {
            case 'E':
                if (muoviSerpente('S', labirinto, nR, nC)) {
                    comandoUltimaMossa = 'S';
                }
                else {
                    mosse--;
                    if (!muoviSerpente(comandoUltimaMossa, labirinto, nR, nC)) {
                        comandoUltimaMossa = 'O';
                        mosse--;
                    }
                }
                break;
            case 'S':
                if (muoviSerpente('O', labirinto, nR, nC)) {
                    comandoUltimaMossa = 'O';
                }
                else {
                    mosse--;
                    if (!muoviSerpente(comandoUltimaMossa, labirinto, nR, nC)) {
                        comandoUltimaMossa = 'N';
                        mosse--;
                    }
                }
                break;
            case 'O':
                if (muoviSerpente('N', labirinto, nR, nC)) {
                    comandoUltimaMossa = 'N';
                }
                else {
                    mosse--;
                    if (!muoviSerpente(comandoUltimaMossa, labirinto, nR, nC)) {
                        comandoUltimaMossa = 'E';
                        mosse--;
                    }
                }
                break;
            case 'N':
                if (muoviSerpente('E', labirinto, nR, nC)) {
                    comandoUltimaMossa = 'E';
                }
                else {
                    mosse--;
                    if (!muoviSerpente(comandoUltimaMossa, labirinto, nR, nC)) {
                        comandoUltimaMossa = 'N';
                        mosse--;
                    }
                }
                break;
        }
        if (mosse > nMosse)
        {
            stringa_mosse[nMosse] = comandoUltimaMossa;
            nMosse++;
        }
    }
    stringa_mosse[nMosse] = '\0';
    char* totale_mosse = (char*)realloc(stringa_mosse, mosse);
    //StampaLabirinto();

    if (vittoria)
    {
        //printf("Hai vinto!!!\n");
        //printf("Totale mosse: %d\n", mosse);
        //printf("Punteggio Finale: %d\n", punteggio);

        for (int i = 0; i < mosse; i++)
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

    char* labirinto = malloc(sizeof(char) * N * M);

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
                labirinto[i * M + j] = c;
                if (c == 'o')
                {
                    snakePositionRiga = i;
                    snakePositionColonna = j;
                }
            }
        }
    }

    if (argc > 1 && strcmp(argv[1], app) == 0)
    {
        trovaPercorsoDestra(labirinto, N, M);
        //StampaLabirinto(labirinto, nR, nC);
    }
    else
    {
        printf("Modalita' manuale attiva, scrivere il percorso:\n");
        loopCoordinate(labirinto, N, M);
    }

    return 0;
}

/*
###################
o    #          $ #
#    #          $ #
#    #   !  #   $ #
#    #      #   $ #
#    #      #     _
#    #      #     #
#           #     #
#    $$$$   #     #
###################
*/