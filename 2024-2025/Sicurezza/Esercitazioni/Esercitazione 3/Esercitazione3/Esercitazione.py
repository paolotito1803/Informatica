import sys
import time
import hashlib
from itertools import product


# def otp(pin):
# #   '''The Acme Corporation OTP generator.
# #   This generator is based on SHA256, a secure one-way hash so to prevent
# #   that the pin value is computed starting from the hash.
# #   Moreover the hash is cut to 6 (decimalized) bytes, which makes inversion
# #   even harder!
# #   '''
#   size = 6
#   otp = ''
#   pin1 = ''
#   otp1 = ''
#   #dict = {}
#   # timestamp changes every minute to allow for synchronization
#   t = time.localtime(time.time())
#   timestamp = '{}-{}-{}-{}:{}'.format(t.tm_year,t.tm_mon,t.tm_mday,t.tm_hour,t.tm_min)
#   # One-way function, to prevent computing PIN from OTP!
#   h = hashlib.sha256((pin + timestamp).encode()).digest()
#
#   for i in range(size):
#     # decimalize i-th byte and add it to the otp
#     digit = h[i] % 10
#     otp += str(digit)
#     print(otp)
#   for combination in product(range(10), repeat=8):
#     pin1 = ''.join(map(str, combination))
#     print(pin1)
#     t1 = time.localtime(time.time())
#     timestamp1 = '{}-{}-{}-{}:{}'.format(t1.tm_year, t1.tm_mon, t1.tm_mday, t1.tm_hour, t1.tm_min)
#     h1 = hashlib.sha256((pin1 + timestamp1).encode()).digest()
#     for i in range(size):
#       digit1 = h1[i] % 10
#       otp1 += str(digit1)
#     if otp1 == otp:
#       if timestamp == timestamp1:
#         print(f"il pin è {pin1}")
#         return
#     otp1 = ''
#     #dict.update({otp1: (pin1,  timestamp)})
#
#   # for key, value in dict.items():
#   #   if key[0] == otp:
#   #     if timestamp == value[1]:
#   #       print(f"il pin è {value[0]}")
#
#
#     #fare for dino a 10^8 ricalcolando hash e otp2 e timestamp creando pin incrementali e salviamo in un dizionario
#   #scorriamo dizionario e verifichiamo che otp == otp2 e controllo tipestamp
#
#
# if __name__ == '__main__':
#   otp(input('pin: '))

def generate_otp(pin, timestamp):
  size = 6
  otp = ''
  h = hashlib.sha256((pin + timestamp).encode()).digest()
  for i in range(size):
    digit = h[i] % 10
    otp += str(digit)
  return otp

if __name__ == '__main__':
  print(generate_otp('41131337', '2020-4-8-21:45'))
  print(generate_otp('41131337', '2020-4-8-21:46'))
  print(generate_otp('41131337', '2020-4-8-21:47'))


