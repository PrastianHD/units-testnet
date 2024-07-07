from web3 import Web3
import random, time
from colorama import init, Fore, Style

init(autoreset=True)

print(
    Fore.YELLOW + """ 
  _   _       _ _     _____         _              _   
 | | | |_ __ (_) |_  |_   _|__  ___| |_ _ __   ___| |_ 
 | | | | '_ \| | __|   | |/ _ \/ __| __| '_ \ / _ \ __|
 | |_| | | | | | |_    | |  __/\__ \ |_| | | |  __/ |_ 
  \___/|_| |_|_|\__|   |_|\___||___/\__|_| |_|\___|\__|
                                                       
""" + Style.RESET_ALL
)

print(Fore.GREEN + "======================================================" + Style.RESET_ALL)
urlrpc = "https://rpc-testnet.unit0.dev"
web3 = Web3(Web3.HTTPProvider(urlrpc))
pknya = input(Fore.CYAN + "Masukan Privatekey: " + Style.RESET_ALL)
account = web3.eth.account.from_key(pknya)

def sendeth(to, amount, nonce, gasnya):
    try:
        txsx = {
            'nonce': nonce,
            'to': web3.to_checksum_address(to),
            'value': amount,
            'gas': 21000,
            'chainId': 88817,
            'gasPrice': web3.to_wei(gasnya, "ether")
        }
        signed_tx = web3.eth.account.sign_transaction(txsx, account._private_key)
        tx_hashsx = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print(Fore.YELLOW + "Recipt Sending Fund >> " + web3.to_hex(tx_hashsx) + " Tx Num: " + str(nonce) + Style.RESET_ALL)
    except Exception as e:
        print(Fore.RED + "Error: " + str(e) + "\nRetry To Execute :)" + Style.RESET_ALL)
        time.sleep(2)
        main()

def main():
    i = web3.eth.get_transaction_count(account.address)
    print(Fore.GREEN + "Now Nonce: " + str(i) + Style.RESET_ALL)
    gasnee = float(0.000000000001)
    while True:
        if(i == 100001):
            print(Fore.GREEN + "All Process Are Done :)" + Style.RESET_ALL)
            break
        amounts = random.randint(10, 20)
        accounts = web3.eth.account.create()
        amountny = "00000000000000000" + str(amounts)
        try:
            sendeth(accounts.address, int(amountny), i, float(gasnee))
        except Exception as e:
            print(Fore.RED + "Error: " + str(e) + "\nRetry To Execute :)" + Style.RESET_ALL)
            time.sleep(1)
            i = web3.eth.get_transaction_count(account.address)
            sendeth(accounts.address, int(amountny), i, float(gasnee * 2))
        i = i + 1

main()
