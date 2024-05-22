/*
 * Trivia quiz per il corso di Sistemi Operativi 2019
 * Prima verifica: pipe
 *
 * by Riccardo Focardi
 */

#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

#define QUESTION "Di che colore e' il cavallo %s di Napoleone?"
#define MAX 1000

// I colori del cavallo
char * colori[] = {"bianco","rosso","verde","grigio","rosa","fucsia","giallo","nero","arancione","marrone",NULL};
char *pipein=NULL,*pipeout=NULL; // pipe names
int fd0=0, fd1=1; 	// stdin e stdout by default

void die() {
	close(fd0);
	close(fd1);
	unlink(pipein);
	unlink(pipeout);
	exit(1);
}

int main(int argc, char **argv) {
	int verbose=0;		// verbosità
	int i,j;			// indici
	int lunghezza;		// lunghezza domanda
	int ncolori;		// numero dei colori
	int index;			// indice colore casuale
	char * domanda;		// buffer domanda
	char c;				// parser
	char d;				// carattere per la lettura
	int fd;				// fd temporaneo

	while ((c = getopt (argc, argv, "vhi:o:")) != -1) {
	    switch (c)
	      {
	      case 'i':
	      case 'o':
	      	if (c=='i')
	      		pipein=optarg;
	      	else
	      		pipeout=optarg;
	      	unlink(optarg);
	      	printf("[*] Creazione pipe '%c' %s\n",c,optarg);
	      	if(mkfifo(optarg,0600)<0) {
	      		perror("[ERRORE] creazione pipe");
	      		die();
	      	}
	      	printf("[*] Apertura pipe  '%c' %s\n",c,optarg);
	        if ((fd = open(optarg,O_RDWR)) < 0) {
	        	perror("[ERRORE] apertura pipe");
	        	die();
	        }
	        if (c=='i')
	      		fd0=fd;
	      	else
	      		fd1=fd;
	        break;
	      case 'v':
	      	verbose=1;
	      	break;
	      default:
          	fprintf (stderr, "Utilizzo: %s [options]\n",argv[0]);
          	fprintf (stderr, "options:\n");
          	fprintf (stderr, "   -i pipeName: nome pipe input\n");
          	fprintf (stderr, "   -o pipeName: nome pipe output\n");
          	fprintf (stderr, "   -v:          modalità verbosa\n");
          	fprintf (stderr, "   -h:          questa schermata\n");
	        die();
	      }
	}

	srandom(time(NULL));   	// inizializza la randomness

	// calcola il numero dei colori
	for(ncolori=0;colori[ncolori];ncolori++);
	if(verbose)
		printf("[VERBOSO] Numero colori: %d\n",ncolori);

	// loop principale
	for (i=0;i<MAX;i++){
		index = random()%ncolori;
		if(verbose)
			printf("[VERBOSO] Colore estratto %d: %s\n",index,colori[index]);
		// compone la domanda
		lunghezza = snprintf(NULL,0,QUESTION,colori[index]);
		domanda = malloc(lunghezza+1);
		snprintf(domanda,lunghezza+1,QUESTION,colori[index]);

		write(fd1,domanda,strlen(domanda));
		if(verbose) {
			if (fd1 == 1) printf("\n");
			printf("[VERBOSO] ho inviato '%s'\n",domanda);
		}
		j=0;
		while(j<strlen(colori[index]) && read(fd0,&d,1)) {
			if (d>=97 && d<=122) {
				if (d!=colori[index][j]) {
					printf("[ERRORE] letto %c invece di %c\n", d, colori[index][j]);
					if(fd0==0) {
						while((c = getchar()) != '\n' && c != EOF);
					}
					die();
				}
				if (verbose) {
					printf("[VERBOSO] letto e verificato %c (ASCII %d)\n",d,d);
				}
				j++; // letto e verificato un carattere
			} else {
				if (verbose) {
					printf("[VERBOSO] letto e ignorato %c (ASCII %d)\n",d,d);
				}
			}
		}

		free(domanda); // rilascia la memoria
	}

	printf("[*] Congratulazioni! Hai superato il trivia quiz!\n");
	close(fd0);
	close(fd1);
	unlink(pipein);
	unlink(pipeout);
	exit(0);
}