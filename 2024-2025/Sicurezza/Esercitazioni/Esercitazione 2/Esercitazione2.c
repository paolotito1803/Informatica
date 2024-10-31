/*
 * Challenge: program exploitation
 *
 * Course "Sicurezza", undergraduate degree in Computer Science
 * Ca' Foscari University, Venice
 * https://secgroup.dais.unive.it/teaching/sicurezza/
 *
 * Author: Riccardo Focardi
 *
 * Task: discover the password
 *
 * compile with
 * gcc pwdChallenge.c -o pwdChallenge 
 *
 */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define PWDLEN 16 // max PWD len without NULL terminator
#define PWDFILE "pwd.txt"
char *buffer1;        // buffer for stored password
char buffer2[PWDLEN]; // buffer of size PWDLEN for typed pwd
/* 
 * exits with an error message 
 */
void die(char *s) {
    printf("Error: %s\n",s); fflush(stdout);
    free(buffer1);
    exit(EXIT_FAILURE);
}
/*
 * Reads PWD from PWDFILE and stores it in buffer1
 */
void *readPwd() {
    FILE *f;
    char c;
    int i;
    buffer1 = malloc(PWDLEN); // allocates PWDLEN chars
    f = fopen(PWDFILE, "r");
    if(f == NULL)
        die("cannot open password file");
    for (i=0;i<PWDLEN-1 && (c = fgetc(f)) != EOF;i++) {
        buffer1[i] = c;
    }
    buffer1[i] = '\0'; // null-terminates the buffer
    fclose(f);
}
/*
 * Reads password from terminal
 * NOTE: we removed gets as it is risky! 
 * We use getchar and check the length instead!
 */
void askPwd() {
    char c;
    int i;
    printf("Insert password: ");
    fflush(stdout);
    // zeroes the buffer2
    memset(buffer2,'\0',PWDLEN);
    // gets is risky we use a loop!!!
    // gets(buffer2); 
    // Reads at most PWDLEN chars!
    for (i=0;i<=PWDLEN && (c=getchar())!=EOF && c!='\n'; i++) { /*bug è dovuto al fatto che il buffer2 ha dimensione uguale alla lunghezza della password, inoltre la 
    lunghezza della password non contiene il carattere di terminazione e quindi facendo il ciclo vado a sovrascrivere nello stack. Inol*/
        buffer2[i]=c; 
    }
}
int main(int argc, char *argv[]) {
    readPwd(); // reads stored PWD in buffer1
    // Debug:
    // printf("%p %p %p \n",&buffer1,&buffer2,buffer1);
    askPwd(); // reads user PDF in buffer2
    // Debug:
    // printf("%p %p %p \n",&buffer1,&buffer2,buffer1);
    // compares buffers, comparison is done up to
    // PWDLEN-1 so it does not matter if strings
    // are null-terminated!
    if (strncmp(buffer1, buffer2, PWDLEN-1) == 0) {
        printf("Authenticated!\n"); fflush(stdout);
        free(buffer1);
        exit(EXIT_SUCCESS);
    } else {
        // Debug:
        // printf("Wrong password: buffer1(%s), buffer2(%s)\n",buffer1,buffer2);
        if (strlen(buffer1) != strlen(buffer2)) { 
            printf("Password should be %ld chars\n",strlen(buffer1));
        }
        die("wrong password!");
    }
}