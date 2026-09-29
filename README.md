# MyTestXPro täze serweri

Bu wersiýa köne Google Forms/Webhook baglanyşygyny ulanmaýar. `MyTestXPro-new.html` täze serwere relative API bilen göni baglanýar:

- `POST /api/results` — synag başlananda/gutarananda netije iberýär
- `GET /api/results` — mugallym paneli üçin netijeleri berýär
- `GET /dashboard.html` — talyp ady, familiýasy, topary, synag wagty, baha, netije ýagdaýy we dogry/ýalňyş sanlaryny görkezýär
- Maglumatlar diňe `data/results.json` içinde täzeden, boş başlangyç bilen saklanýar

## Işletmek

```bash
cd mytest-server
node server.js
```

Soňra:

- Talyp programmasy: `http://SERVER_IP:8787/`
- Mugallym paneli: `http://SERVER_IP:8787/dashboard.html`

`PORT=8080 node server.js` bilen porty üýtgedip bolýar.
