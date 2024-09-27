import re
with open('/home/rookie/Python/moby.txt','r') as f: 
    data = f.read()
    #print(re.search(r'\bthe\s(d[a-z]{4})\b', data))
    print(re.search('the d[a-z][a-z][a-z][a-z][^a-z]', data))
    #passwd decks