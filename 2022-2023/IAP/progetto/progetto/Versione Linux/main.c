#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "SnakeInterattivo.h"
#include "SnakeAI.h"
#include "ListCoordinate.h"

/**
* @file main.c
* @author Paolo, Leonardo, Giacomo
* @mainpage  Snake Project
* @section  SnakeLabyrinth 
*
* Benvenuto Giocatore!! In questo gioco potrai sfidare te stesso nel creare nuovi e sempre più complicati labirinti.
*Inoltre potrai divertirti a vedere il funzionamento delle diverse modalità di AI.
**/

//Variabile per far ricominciare il gioco
int loop = 1;

int main(int argc, char* argv[])
{
    while (loop)
    {
        //Variabili
        int M = 0;
        int N = 0;

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
            l.list_coordinateSerpente = NULL;
            l.list_movimenti = NULL;
        }


        //Inizio del programma

        //Stampa a video del "logo" del programma
        printf("                                                             _                           \n");
        printf("                    _               _       _               (_)      _   _               \n");
        printf("    ___ _ __   __ _| | _____       | | __ _| |__  _   _ _ __ _ _ __ | |_| |__            \n");
        printf("   / __| '_ \\ / _` | |/ / _ \\ ____ | |/ _` | '_ \\| | | | '__| | '_ \\| __| '_ \\      \n");
        printf("   \\__ \\ | | | (_| |   <  __/      | | (_| | |_) | |_| | |  | | | | | |_| | | |        \n");
        printf("   |___/_| |_|\\__,_|_|\\_\\___|      |_|\\__,_|_.__/ \\__, |_|  |_|_| |_|\\__|_| |_|    \n");
        printf("                                                   __/ |                                 \n");
        printf("                                                  |___/                                  \n\n");

        //Frase di benvenuto
        printf("Benvenuto al Snake-Labirinto! Sfida la tua abilita' di guida del serpente mentre esplorate il labirinto e cercate di raccogliere tutte le monete ed evitare tutti gli imprevisti!\n\n");

        printf("Inserisci le dimensioni del labirinto:\n");
        //Inserimento delle dimensioni del labirinto
        printf("Numero di colonne: ");
        scanf("%d", &M);
        while (M < 2)
        {
            printf("!Valore inserito non valido!\nNumero di colonne: ");
            scanf("%d", &M);
        }
        l.nC = M;

        printf("Numero di righe: ");
        scanf("%d", &N);
        while (N < 2)
        {
            printf("!Valore inserito non valido!\nNumero di righe: ");
            scanf("%d", &N);
        }
        l.nR = N;


        printf("Abbiamo quasi finito, ore inserici il labirinto qui sotto (puoi fare copia ed incolla): \n");
        //Inserimento del labirinto (da tastiera)

        l.labirinto = malloc(sizeof(char) * M * N);
        char c;
        for (int i = 0; i < (N); i++)
        {
            for (int j = 0; j < (M); j++)
            {
                scanf("%c", &c);
                if (c == '\n')
                {
                    j--;
                }
                else
                {
                    l.labirinto[i * M + j] = c;
                    if (c == l.carattereSnake)
                    {
                        allungaSnake(&l, i, j);
                    }
                }
            }
        }

        //char app;
        //scanf("%c", &app);


        char sceltaManAI = ' ';
        do
        {
            if (sceltaManAI != '\n')
            {
                printf("Ci siamo quasi! vuoi giocare manualmente oppure vuoi che il PC trova il percoso tramite le sofisticate AI:\n");
                printf("Inserisci M per la modalita' manuale e A per quella automatica con l'AI:\n");
            }

            //Selta della modalità di gioco: giococ manuale o AI 
            scanf("%c", &sceltaManAI);

        } while (sceltaManAI != 'M' && sceltaManAI != 'A');


        if (sceltaManAI == 'M')
        {
            printf("E' arrivato il momento di giocare! Buona fortuna!\n");
            loopCoordinate(&l);
        }
        else
        {
            char sceltaAI = ' ';
            do
            {
                if (sceltaAI != '\n')
                {
                    printf("Siamo arrivati all'ultimo passaggio, ora tocca a te di decidere quale intelligenza artificiale attivare tra queste:\n");
                    printf("|1| Random\n");
                    printf("|2| Destra\n");
                    printf("|3| Sinistra\n");
                    printf("|4| Algoritmo ricorsivo\n");
                    printf("--\n");
                    printf("|5| Fai sceglie al PC\n");
                    printf("|6| Fai trovare al PC il percorso migliore\n");
                }

                //Selta della modalità di gioco: tipo di labirinto
                scanf("%c", &sceltaAI);

            } while (sceltaAI != '1' && sceltaAI != '2' && sceltaAI != '3' && sceltaAI != '4' && sceltaAI != '5' && sceltaAI != '6');

            printf("Modalita' AI attivata!\n");

            if (sceltaAI == '5')
            {
                int s = (rand() % 4 + 1);
                switch (s)
                {
                case 1:
                    sceltaAI = '1';
                    break;
                case 2:
                    sceltaAI = '2';
                    break;
                case 3:
                    sceltaAI = '3';
                    break;
                case 4:
                    sceltaAI = '4';
                    break;
                default:
                    sceltaAI = '1';
                    break;

                }

                printf("Algoritmo scelto dal PC: %c\n", sceltaAI);
            }

            switch (sceltaAI)
            {
            case '1':
                trovaPercorsoRandom(&l);
                break;
            case '2':
                trovaPercorsoDestra(&l);
                break;
            case '3':
                trovaPercorsoSinistra(&l);
                break;
            case '4':
                trovaPercorsoRicorsivo(&l);
                break;
            case '6':
                trovaPercorsoRicorsivo(&l);
                break;
            }
                
        }

        printf("\nIl gioco e' terminato, vuoi ricominciare a giocare? (Inserire \'0\' per terminare)\n");

        char loopChar = '0';
        scanf("\n%c", &loopChar);
        if (loopChar == '0')
        {
            loop = 0;
        }

        printf("\n======================\n\n");
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


"                 _        "+
"                | |       "+
" ___ _ __   __ _| | _____ "+
"/ __| '_ \ / _` | |/ / _ \"+
"\__ \ | | | (_| |   <  __/"+
"|___/_| |_|\__,_|_|\_\___|"+

printf(" ######  ##    ##    ###    ##    ## ######## \n");
printf("##    ## ###   ##   ## ##   ##   ##  ##       \n");
printf("##       ####  ##  ##   ##  ##  ##   ##       \n");
printf(" ######  ## ## ## ##     ## #####    ######   \n");
printf("      ## ##  #### ######### ##  ##   ##       \n");
printf("##    ## ##   ### ##     ## ##   ##  ##       \n");
printf(" ######  ##    ## ##     ## ##    ## ######## \n");


printf("                  _               _       _                _       _   _           \n");
printf("                 | |             | |     | |              (_)     | | | |          \n");
printf("  ___ _ __   __ _| | _____       | | __ _| |__  _   _ _ __ _ _ __ | |_| |__        \n");
printf(" / __| '_ \ / _` | |/ / _ \ ____ | |/ _` | '_ \| | | | '__| | '_ \| __| '_ \       \n");
printf(" \__ \ | | | (_| |   <  __/      | | (_| | |_) | |_| | |  | | | | | |_| | | |      \n");
printf(" |___/_| |_|\__,_|_|\_\___|      |_|\__,_|_.__/ \__, |_|  |_|_| |_|\__|_| |_|      \n");
printf("                                                 __/ |                             \n");
printf("                                                |___/                              \n");

*/