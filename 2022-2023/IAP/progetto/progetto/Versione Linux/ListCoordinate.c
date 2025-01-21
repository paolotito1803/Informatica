#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

struct list {
    int riga;
    int colonna;
    struct list* next;
};

typedef struct list list_coordinate;

list_coordinate* l_create(int riga, int colonna) {
    list_coordinate* l = (list_coordinate*)malloc(sizeof(list_coordinate));
    if (!l) exit(EXIT_FAILURE);
    l->riga = riga;
    l->colonna = colonna;
    l->next = NULL;
    return l;
}

void l_enqueue(list_coordinate** l_coordinate, int riga, int colonna) {
    if (*l_coordinate == NULL) {
        *l_coordinate = l_create(riga, colonna);
    }
    else {
        list_coordinate* l = *l_coordinate;
        while (l->next != NULL) {
            l = l->next;
        }
        l->next = l_create(riga, colonna);
    }
}


void l_dequeue(list_coordinate** l_coordinate)
{
    if (*l_coordinate != NULL) {
        list_coordinate** l = &((*l_coordinate)->next);
        //(*l_coordinate) = NULL;
        *l_coordinate = (*l_coordinate)->next;
    }
}

bool l_contains(list_coordinate* l_coordinate, int riga, int colonna)
{
    list_coordinate* l = l_coordinate;
    while (l != NULL) {
        if (l->colonna == colonna && l->riga == riga)
            return true;
        l = l->next;
    }
    return false;
}

int l_getLast_riga(list_coordinate* l_coordinate)
{

    if (l_coordinate == NULL)
        return -1;

    while (l_coordinate->next != NULL)
    {
        l_coordinate = l_coordinate->next;
    }

    return l_coordinate->riga;
}


int l_getLast_colonna(list_coordinate* l_coordinate)
{

    if (l_coordinate == NULL)
        return -1;

    while (l_coordinate->next != NULL)
    {
        l_coordinate = l_coordinate->next;
    }

    return l_coordinate->colonna;
}

bool l_isLast(list_coordinate* l_coordinate, int riga, int colonna)
{
    if (l_coordinate == NULL)
        return false;

    return l_getLast_riga(l_coordinate) == riga && l_getLast_colonna(l_coordinate) == colonna;

}

int l_get_riga(list_coordinate* l_coordinate)
{
    return l_coordinate->riga;
}

int l_get_colonna(list_coordinate* l_coordinate)
{
    return l_coordinate->colonna;
}
