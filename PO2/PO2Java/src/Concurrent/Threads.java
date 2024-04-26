package Concurrent;

public class Threads {

    public static String suffix = "Baudo";

    public static void loop(String msg){
        while(true){
            System.out.println(msg + " " + suffix);
        }
    }
    public static class MyThread extends Thread {
        @Override
        public void run() {
            /*while (true) {
                System.out.println("ciao");
            }*/
            loop("ciao");
        }
    }

    public static void main(String[] args) {
        Thread t = new MyThread();
        t.start();

        loop("pippo");
        Thread t2 = new Thread(new Runnable() { //faccio con un'anonimus class la creazione di un runnable
            @Override
            public void run() {
                //codice cche il thread voglio che esegua
                loop("ciccio");
            }
        });
        t2.start();
        //fare il thread con runnable con una lambda
        Thread t3 = new Thread(() -> loop("ciccio"));
        t3.start();

        loop("pippo");
        /*while (true) {
            System.out.println("pippo");
        }*/

    }
}
