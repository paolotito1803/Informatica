package Esercizi_Esame.Esame_2019_6_20;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Es2 {
    public static class Node<T> implements Iterable<T>{
        T data;
        Node<T> right, left;

        public Node(T data, Node<T> left, Node<T> right){
            this.data = data;
            this.left = left;
            this.right = right;
        }

        public Node(T data){
            this(data, null, null);
        }

        public void dfs(Node<T> t, Collection<T> c){
            if(t != null){
                c.add(t.data);
                dfs(t.left, c);
                dfs(t.right, c);
            }
        }

        @Override
        public Iterator<T> iterator(){
            Collection<T> c = new ArrayList<>();
            dfs(this, c);
            return c.iterator();
        }
    }
}
