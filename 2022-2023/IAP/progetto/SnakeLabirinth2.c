#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include<string.h>

int snakePositionRiga = 1;
int snakePositionColonna = 0;
char labirinto[10][20];
int nR;
int nC;

char carattereDiArrivo = '_';
int vittoria = 0;

int mosse = 0;
int sommaMonete = 0;

void Bordi() //nC = numero colonne -- nR = numero righe
{
    for (int i = 0; i < nC; i++) //Colonna
    {
        labirinto[0][i] = '#';
        labirinto[nR - 1][i] = '#';
    }

    for (int j = 0; j < nR; j++) //Riga
    {
        if (j != 1)
        {
            labirinto[j][0] = '#';
        }

        if (j != 5)
        {
            labirinto[j][nC - 1] = '#';
        }
        else
        {
            labirinto[j][nC - 1] = '_';
        }

    }

}

void caricaOggetti(int posOstacoli[][2], int lung, char carattere)
{
    for (int i = 0; i < lung; i++)
    {
        labirinto[posOstacoli[i][1]][posOstacoli[i][0]] = carattere;
    }
}

void puliziaArray()
{
    for (int j = 0; j < nR; j++) //Righe
    {
        for (int i = 0; i < nC; i++) ///Colonne
        {
            labirinto[j][i] = '-';
        }
    }
}

void CreaLabirinto(int posOstacoli[][2], int l)
{

    puliziaArray();
    Bordi();
    caricaOggetti(posOstacoli, l, '#');
    //Passaggi(mat);
}

void StampaLabirinto()
{
    for (int j = 0; j < nR; j++) //Righe
    {
        for (int i = 0; i < nC; i++) ///Colonne
        {
            if (labirinto[j][i] == '-')
            {
                printf(" ");
            }
            else
            {
                printf("%c", labirinto[j][i]);
            }
        }
        printf("\n");
    }


}





int muoviSerpente(char letteraCoordinate)
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


    labirinto[snakePositionRiga][snakePositionColonna] = '.';

    if (labirinto[posRiga][posColonna] != '#' && posRiga > 0)
    {
        snakePositionColonna = posColonna;
        snakePositionRiga = posRiga;
        esitoMossa = 1;
    }

    if (labirinto[posRiga][posColonna] == carattereDiArrivo)
    {
        vittoria = 1;
    }

    labirinto[snakePositionRiga][snakePositionColonna] = 'o';

    StampaLabirinto();
    return esitoMossa;
}

int loopCoordinate()
{
    char letteraCoorsinate = 'z';

    scanf("%c", &letteraCoorsinate);
    while (letteraCoorsinate != 'z')
    {
        muoviSerpente(letteraCoorsinate);

        if (!vittoria)
        {
            scanf("%c", &letteraCoorsinate);
        }
        else
        {
            letteraCoorsinate = 'z';
        }

    }

    if (vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", mosse);
    }

}

void trovaPercorsoRandom()
{
    int r = -1;
    //time_t t;
    char* totale_mosse = (char*)malloc(1000 * sizeof(char));
    int num_mosse = 0;
    while (!vittoria)
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
        muoviSerpente(comando);
        //char a;
        //printf("%d", r);
        //scanf("%c", &a);
        
    }

    char* stringa_mosse = (char*)realloc(totale_mosse, mosse);
    StampaLabirinto();

    if (vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", mosse);
        for (int i = 0; i<mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }
    }
}


void trovaPercorsoDestra()
{
    char comandoUltimaMossa = 'E';
    char* stringa_mosse = (char*)malloc(500 * sizeof(char));
    int nMosse = 0;
    while (!vittoria)
    {
        switch (comandoUltimaMossa) {
        case 'E':
            if (muoviSerpente('S')) {
                comandoUltimaMossa = 'S';
            }
            else {
                mosse--;
                if (!muoviSerpente(comandoUltimaMossa)) {
                    comandoUltimaMossa = 'O';
                    mosse--;
                }
            }
            break;
        case 'S':
            if (muoviSerpente('O')) {
                comandoUltimaMossa = 'O';
            }
            else {
                mosse--;
                if (!muoviSerpente(comandoUltimaMossa)) {
                    comandoUltimaMossa = 'N';
                    mosse--;
                }
            }
            break;
        case 'O':
            if (muoviSerpente('N')) {
                comandoUltimaMossa = 'N';
            }
            else {
                mosse--;
                if (!muoviSerpente(comandoUltimaMossa)) {
                    comandoUltimaMossa = 'E';
                    mosse--;
                }
            }
            break;
        case 'N':
            if (muoviSerpente('E')) {
                comandoUltimaMossa = 'E';
            }
            else {
                mosse--;
                if (!muoviSerpente(comandoUltimaMossa)) {
                    comandoUltimaMossa = 'N';
                    mosse--;
                }
            }
            break;
        }
        stringa_mosse[nMosse] = comandoUltimaMossa;
        nMosse++;
    }
  
    char* totale_mosse = (char*)realloc(stringa_mosse, mosse);
    StampaLabirinto();

    if (vittoria)
    {
        printf("Hai vinto!!!\n");
        printf("Totale mosse: %d\n", mosse);
    

        for (int i = 0; i < mosse; i++)
        {
            printf("%c", stringa_mosse[i]);
        }

    }
}


int main()
{

    int posOstacoli[][2] = { {5, 1}, {5, 2}, {5, 3}, {5, 4}, {5, 5}, {5, 6},  {12, 3}, {12, 4}, {12, 5}, {12, 6}, {12, 7}, {12, 8} }; //colonna e riga
    labirinto[10][20];
    nR = 10;
    nC = 20;

    CreaLabirinto(posOstacoli, 12);
    labirinto[snakePositionRiga][snakePositionColonna] = 'o';
    StampaLabirinto();

    printf("Inserire S per cominciare a giocare, R se vuole provare ad effettuare il percorso a random, D per sempre a destra\n");
    char scelta;
    scanf("%c", &scelta);
    if (scelta == 'R')
    {
        trovaPercorsoRandom();
    }
    else if (scelta == 'D')
    {
        trovaPercorsoDestra();
    }
    else if (scelta == 'S')
    {
        loopCoordinate();
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