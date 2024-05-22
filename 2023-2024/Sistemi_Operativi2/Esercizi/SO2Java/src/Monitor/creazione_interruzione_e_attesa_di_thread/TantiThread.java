package Monitor.creazione_interruzione_e_attesa_di_thread;

    public class TantiThread extends Thread {

        public static final int NumeroThread = 20;
        public int passo;

        public TantiThread(int num) {
            this.passo = num;
        }

        public void run() {
                try {
                    // NOTA: se l'interruzione arriva prima della sleep viene
                    // bufferizzata!
                    sleep(2000);  // dorme per 2 secondi
                } catch(InterruptedException e) {
                    System.out.println("["+getName()+"]"+" Ah mi hanno interrotto!!");
                    return;
                }
                // saluta ed esce
                System.out.println("Saluti dal thread " + getName());
        }

        public static void main(String[] args) throws InterruptedException {
            int i;
            Thread t[] = new Thread[NumeroThread];
            for(i = 0; i < NumeroThread; i++){
                t[i] = new TantiThread(i);
                t[i].start();
            }

            t[3].interrupt();
            t[5].interrupt();
            t[6].interrupt();
            t[15].interrupt();

            for(i = 0; i < NumeroThread; i++){
                t[i].join();
            }

            System.out.println("Saluti dal thread " + Thread.currentThread().getName());
        }
    }

