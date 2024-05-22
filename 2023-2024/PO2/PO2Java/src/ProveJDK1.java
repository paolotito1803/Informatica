import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ProveJDK1 {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<Integer>(); // costruttore empty
        /* posso scrivere anche Collection<Integer> l = new ArrayList<Integer>();
           perchè arrayList è un sottotipo di Collection --> subsumption*/
        l.add(21); // ereditato da collection
        l.add(2); // ereditato da collection
        l.add(456); // ereditato da collection
        l.set(2,987);

        Iterator<Integer> it = l.iterator();
        while(it.hasNext()){
            int n = it.next();
            System.out.println(n);
        }

        for(int i = 0; i < l.size(); i++){
            int n = l.get(i);
            System.out.println(n);
        }
    }
}
