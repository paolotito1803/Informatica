package Esercizi_Esame.Esame_2023_6_1;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;

//esame 1/6/23
public class BST<T> implements Iterable<T> {
    protected final Comparator<? super T> cmp;
    protected Node root;
    protected class Node {
        protected final T data;
        protected Node left, right;
        protected Node(T data, Node left, Node right) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    }
    public BST(Comparator<? super T> cmp) {
        this.cmp = cmp;
    }
    public void insert(T x) {
        root = insertRec(root, x);
    }
    protected Node insertRec(Node n, T x) {
        if(n == null)
            return new Node(x, null, null);
        else {
            if(cmp.compare(n.data, x) < 0)
                n.right = insertRec(n.right, x);
            else if(cmp.compare(n.data, x) > 0)
                n.left = insertRec(n.left, x);
        }
        return n;
    }
    protected void dfsInOrder(Node n, Collection<T> out) {
        if(n != null){
            dfsInOrder(n.left, out);
           out.add(n.data);
           dfsInOrder(n.right, out);
        }
    }
    @Override
    public Iterator<T> iterator() {
        Collection<T> it = new ArrayList<>();
        dfsInOrder(root, it);
        return it.iterator();
    }
    public T min() {
        T min = root.data;
        while(root.left != null){
            min = root.data;
            root = root.left;
          /*  if (cmp.compare(root.data, min) < 0)
                min = root.data; opzionale*/
        }

        return min;
    }
    public T max() {
        T max = root.data;
        while(root.right != null){
            max = root.data;
            root = root.right;
        }
        return max;
    }

    public static class BST2<T extends Comparable<? super T>> extends BST<T> {
        public BST2() {
            super(Comparable::compareTo);
        }
    }

}

