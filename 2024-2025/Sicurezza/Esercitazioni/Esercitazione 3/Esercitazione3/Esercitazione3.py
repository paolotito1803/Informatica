import hashlib
import itertools


def generate_otp(pin, timestamp):
    size = 6
    otp = ''
    h = hashlib.sha256((pin + timestamp).encode()).digest()
    for i in range(size):
        digit = h[i] % 10
        otp += str(digit)
    return otp


def find_pin(otp_dict):
    digit = '0123456789'
    for pin in range(100000000):
    #for pin in itertools.product(digit, repeat=8):
        #pin_str = ''.join(pin)
        pin_str = str(pin).zfill(8)  # Ensure it's 8 digits long
        # Generate OTPs for current PIN and put them in a dictionary with the timestap key
        generated_otps = {timestamp: generate_otp(pin_str, timestamp) for timestamp in otp_dict}
        # Print the current PIN and the generated OTPs
        print(f"Trying PIN: {pin_str}, Generated OTPs: {generated_otps}")
        #check all the opts generated at the specific timestamp with the the otp in the dictionary
        if all(generated_otps[timestamp] == otp for timestamp, otp in otp_dict.items()):
            return pin_str
    return None


def main():
    otp_dict = {
        '2020-4-8-21:45': '754104',
        '2020-4-8-21:46': '353471',
        '2020-4-8-21:47': '084633'
    }

    print("Trying to find the secret PIN...")
    secret_pin = find_pin(otp_dict)
    if secret_pin:
        print(f'The secret PIN is: {secret_pin}')
    else:
        print('Could not find the secret PIN.')


if __name__ == "__main__":
    main()
