package Esercizi_Esame.Esame_2022_7_1;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Es2 {
    public static class FiboSequence implements Iterable<Integer>{
        private int len;
        private HashMap<Integer, Integer> map = new HashMap<>();
        public FiboSequence(int len){
            this.len = len;
        }

        public int calFib(int n){
            if(n == 0) {
                map.put(0, 1);
                return 1;
            }
            if(n == 1) {
                map.put(1, 1);
                return 1;
            }
            else {
                if(!map.containsKey(n))
                    map.put(n, calFib(n - 1) + calFib(n - 2));
            }
            return map.get(n);
        }

        public Iterator<Integer> iterator(){
            int n = 0;
            return new Iterator(){
                @Override
                public boolean hasNext(){
                    return len > 0;
                }

                @Override
                public Integer next(){
                    return calFib(n);
                }
            };
        }
    }























    /*public static class FiboSequence implements Iterable<Integer>{
        private final int len;

        FiboSequence(int len) {
            this.len = len;
        }

        protected int fib(int n){
            if(n == 0)
                return 0;
            if(n == 1)
                return 1;
            else{
                return fib(n - 1) + fib(n - 2);
            }
        }

        @Override
        public Iterator<Integer> iterator(){
            return new Iterator<>(){
                private int i = 0;

                @Override
                public boolean hasNext(){
                    return i < len;
                }

                @Override
                public Integer next(){
                    return fib(i++);
                }
            };
        }
    }

    public static class CachedFiboSequence extends FiboSequence{

        private final Map<Integer, Integer> cache;

        public CachedFiboSequence(int len, Map<Integer, Integer> cache){
            super(len);
            this.cache = cache;
        }

        @Override
        protected int fib(int n){
            if(n == 0)
                return 0;
            if(n == 1)
                return 1;
            else{
                Integer r = cache.get(n);
                if (r == null) {
                    r = fib(n - 1) + fib(n - 2);    // questa è una ricorsione in dynamic dispatch
                    cache.put(n, r);
                }
                return r;
            }
        }
    }

    public static class GlobalCachedFiboSequence extends CachedFiboSequence {

        // inizializziamo questa cache statica; poi passiamo al supercostruttore sempre questo campo
        // così tutte le istanze useranno sempre la stessa hashmap senza saperlo
        private final static Map<Integer, Integer> globalCache = new HashMap<>();

        public GlobalCachedFiboSequence(int max) {
            super(max, globalCache);
        }
    }*/
}
