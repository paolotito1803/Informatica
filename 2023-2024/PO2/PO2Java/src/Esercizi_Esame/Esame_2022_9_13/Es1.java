package Esercizi_Esame.Esame_2022_9_13;

import java.util.Iterator;
import java.util.concurrent.BlockingQueue;

public class Es1 {
    public static class TreeNode<T> implements Iterable<T> {

        private final T data;
        private final TreeNode<T> left, right;
        private TreeNode<T> parent = null;

        public TreeNode(T data, TreeNode<T> right, TreeNode<T> left) {
            this.data = data;
            this.left = left;
            this.right = right;

            if (left != null)
                left.parent = this;
            if (right != null)
                right.parent = this;
        }

        public static <T> TreeNode<T> l(TreeNode<T> l, T data) {
            return new TreeNode<>(data, null, l);
        }

        public static <T> TreeNode<T> r(T data, TreeNode<T> right) {
            return new TreeNode<>(data, null, right);
        }

        public static <T> TreeNode<T> lr(T data, TreeNode<T> left, TreeNode<T> right) {
            return new TreeNode<>(data, left, right);
        }

        public static <T> TreeNode<T> v(T data) {
            return new TreeNode<>(data, null, null);
        }

        @Override
        public boolean equals(Object o) {
            if (o instanceof TreeNode) {
                BlockingQueue<Integer> b;

                TreeNode<T> t = (TreeNode<T>) o;
                return isEqual(data, t.data) && isEqual(left, t.left) && isEqual(right, t.right);
            }
            return false;
        }

        public boolean isEqual(Object o1, Object o2) {
            return (o1.equals(o2) && o1 != null) || o1 == o2;
        }

        @Override
        public Iterator<T> iterator() {
            return new Iterator<T>() {
                private TreeNode<T> attuale = TreeNode.this;

                private static <T> TreeNode<T> nextData(TreeNode<T> p) {
                    if (p.left != null)
                        return p.left;
                    else if (p.right != null)
                        return p.right;
                    else {
                        return p;
                    }
                }

                @Override
                public T next() {
                    T r = attuale.data;
                    attuale = nextData(attuale);
                    return r;
                }

                @Override
                public boolean hasNext() {
                    return attuale != null;
                }
            };
        }

        public static void main(String[] args) {
            TreeNode<Integer> t1 =
                    TreeNode.lr(1,
                            TreeNode.lr(2,
                                    TreeNode.v(3),
                                    TreeNode.v(4)),
                            TreeNode.r(5,
                                    TreeNode.lr(6,
                                            TreeNode.v(7),
                                            TreeNode.v(8))));

            TreeNode<Integer> t2 =
                    TreeNode.lr(1,
                            TreeNode.r(5,
                                    TreeNode.lr(6,
                                            TreeNode.v(7),
                                            TreeNode.v(8))),
                            TreeNode.lr(2,
                                    TreeNode.v(3),
                                    TreeNode.v(4)));


            // test pretty printer
            System.out.println("pretty printer:");
            System.out.println("t1: " + t1);
            System.out.println("t2: " + t2);

            // test equality
            System.out.print("equality: ");
            System.out.println(t1.equals(t2) + ", " + (t1.left != null ? t1.left.equals(t2.right) : ""));

            // test iterator
            System.out.print("iterator: ");
            for (Integer n : t1) {
                System.out.printf("%d ", n);
            }
            System.out.println();


        }
    }
}
