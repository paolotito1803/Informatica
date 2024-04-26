#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#define PINLEN "5"         

int main(){
    char pin_str[128];
    int pin;
    int esito = 1;
    pid_t pid, status;
    for(pin = 0; ; pin++){
        if( snprintf(pin_str,128,"%05d",pin) >= 6){
            perror("errore lunghezza");
            exit(1);
        }
        else{
            esito = fork();
            if(esito < 0){
                perror("errore fork");
                exit(1);
            }
            else if(esito == 0){
                execl("./checkPIN-WSL", "./checkPIN-WSL",pin_str, NULL);
                perror("errore exec");
                exit(1);
            }
            if((pid = wait(&status)) >= 0){
                if(WIFEXITED(status) && WEXITSTATUS(status) == 0){
                    printf("PIN trovato: Yeah!!\n");
                    exit(EXIT_SUCCESS);
                }
            }
            else{
                perror("errore wait");
                exit(EXIT_FAILURE);
            }
        }
    }


























    /*pid_t pid, status;
    char pin_str[128];
    int maxbuff = atoi(PINLEN) + 1;
    int pin;
    pid_t esito=1,i;
    for(pin = 0; ; pin++){
        if(snprintf(pin_str,128,"%05d",pin) >= maxbuff){
            perror("errore lunghezza");
            exit(1);
        }
        else{
            esito = fork();
            if(esito < 0){
                perror("Errore fork");
                exit(1);
            }
            else if(esito == 0){
                execl("./checkPIN-WSL", "./checkPIN-WSL", pin_str, NULL);
                perror("non funziona la execl");
                exit(1);
            }
           if ((pid=wait(&status)) >= 0) {
                if (WIFEXITED(status) && WEXITSTATUS(status)==0) {
                    printf("PIN trovato: Yeah!!\n");
                    exit(EXIT_SUCCESS);
                }
            } 
            else {
                perror("errore wait");
                exit(EXIT_FAILURE);
            }
        }
   
    }*/
}