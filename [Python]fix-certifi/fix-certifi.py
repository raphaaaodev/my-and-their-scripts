import certifi
import requests

# add first the main certificate X.509 base 64 (*.cer), and run. Do the same for the children.

API_ENDPOINT = "https://dejt.jt.jus.br/dejt/f/n/diariocon"

try:
    print('Checking connection to website...')
    test = requests.get(API_ENDPOINT)
    print('Connection to the website OK.')
except requests.exceptions.SSLError as err:
    print('SSL Error. Adding custom certs to Certifi store...')
    cafile = certifi.where()
    with open('mainchildofchild.cer', 'rb') as infile:
        customca = infile.read()
    with open(cafile, 'ab') as outfile:
        outfile.write(customca)
    print('That might have worked.')

#from https://appdividend.com/2022/01/29/python-certifi/