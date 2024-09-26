def function(t):
    f = {}
    for i in t:
        if i in f:
            f[i] += 1
        else
            f[i] = 1
    return sorted(f.item(), key = lambda x: x[1], reverse=True) 