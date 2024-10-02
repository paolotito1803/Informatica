import subprocess, re
def readuntil(s,regexp):
    p = subprocess.Popen(['/home/rookie/Python/game'], stdin = s, stdout = subprocess.PIPE)
    data = p
    p.communicate()
    re.search(regexp, data)