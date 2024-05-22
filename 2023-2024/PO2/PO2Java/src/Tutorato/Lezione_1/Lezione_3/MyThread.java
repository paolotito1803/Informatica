package Tutorato.Lezione_3;

/*
o estendo classe Thread ed oveeraido run
creo nuovo thread e gli faccio una nuova lambda
 */

public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("sono il thread ," + this.getName());
    }

    public static void main(String[] args) {
        //metodo estensione classe thread e override metodo run
        Thread t1 = new MyThread();
        t1.start();


        System.out.println("sono il main thread " + Thread.currentThread().getName());

        //istanzio thread e passo runnable (4 forma di lambda)
        Thread t2 = new Thread(() -> System.out.println("sono il thread" + Thread.currentThread().getName())); //resituisce il tipo thread
                                                                                                              // che è il thread che sta eseguendo
                                                                                                             // questo pezzo di codice
                                                                                                              // quindi posso farci il getName ;
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }


        //metodo join dice al main thread di aspettare la fine dell'esecuzione del thread in esecuzione prima di ripartire
    }
}
