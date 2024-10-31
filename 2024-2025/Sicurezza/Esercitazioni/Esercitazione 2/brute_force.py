import subprocess
import string
import itertools

def test_password(password):
    process = subprocess.Popen(
        ['./pwdChallenge'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    stdout, stderr = process.communicate(input=password.encode())
    return stdout.decode()

# Function to generate password combinations
def generate_passwords():
    characters = string.ascii_letters + string.digits + string.punctuation
    for password in itertools.product(characters, repeat=16):  # Fixed length of 16
        yield ''.join(password)

# Try all generated passwords
for password in generate_passwords():
    result = test_password(password)
    print(f"Trying password: {password}")
    if "Authenticated!" in result:
        print(f"Password found: {password}")
        break
