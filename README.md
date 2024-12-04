# MultiLern

![Multilern - logo](/frontend/assets/mini-multilern-logo.png)

Multilern to innowacyjna platforma edukacyjna która ma na celu ułatwienie procesu nauki w szkole. Aplikacja umożliwia uczniom tworzenie i zarządzanie notatkami oraz fiszkami, które pomagają w efektywnej nauce materiału. Dodatkowo, użytkownicy mogą wyszukiwac rozwiązania do zadań, a także tworzyć nowe zapytania i posty, na które moga odpowiadać inni użytkownicy. Najważniejszą funkcjonalnościa Multilerna jest udostępnianie tzw. "pewniaków sprawdzianowych", czyli zestawu zadań, które najprawdopodobniej pojawią się na sprawdzianach. W przyszłości planujemy wprowadzić dodatkowe funkcje, takie jak chat oraz korepetycje, a także płatny pakiet premium, który da użytkownikom dostęp do zaawansowanych opcji

## Jak uruchomić?

1. Pobierz repozytorium i zainstaluj paczki

```
yarn // w obu projektach trzeba wywołac komendę
```

2. W folderze backend oraz frontend ustaw odpowiednie zmienne w pliku env

- jeżeli używasz własnej bazy to ustaw ją według poniższej instrukcji i zaimportuj plik multilern.sql

```
// backend
DATABASE_URL="mysql://user:password@localhost:3306/databaseName"
// frontend
API_URL="http://localhost:3001"
```

- jeżeli chcesz używac bazy serwerowej ustaw taki

```
 // backend
DATABASE_URL="mysql://u7erzleedh7bprol:N7GTEkJvZ7mFM0NQtKgg@bk0ygxf04u4ha7pfwfra-mysql.services.clever-cloud.com:3306/bk0ygxf04u4ha7pfwfra"
// frontend
API_URL="https://multilern-production.up.railway.app"
```

> [!WARNING]
> Serwer posiada ograniczoną ilość połączeń dlatego czasem mogą być wyrzucane błędy 500 3. Z poziomu folderu backend wywołaj komenda

```
yarn start
```

A z poziomu frontendu

```
yarn start // jeśli chcesz włączyć aplikację
yarn ios // jeśli chcesz włączyć aplikację za pomocą emulatora IOS
yarn android // jeśli chcesz włączyć aplikację za pomocą emulatora Android
```

4. Jeżeli chcesz zobaczyć pokrycie testowe są na to 2 opcje

- włączenie pliku .html w folderze coverage folderu frontend lub backend
- uruchomienie komedy

```
yarn coverage // z poziomu frontendu
yarn test:cov // z poziomu backendu
```

## Testy End-to-End (E2E) z Detox dla aplikacji React Native

Testy end-to-end (E2E) są realizowane za pomocą narzędzia [Detox](https://wix.github.io/Detox/), które umożliwia automatyczne testowanie aplikacji React Native na urządzeniach z systemami iOS i Android. Poniżej znajdziesz instrukcję konfiguracji oraz uruchamiania testów.

### Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane następujące narzędzia:
- **Node.js** (zalecana wersja 14 lub nowsza),
- **React Native CLI** lub **Expo CLI** (w zależności od projektu),
- **Detox CLI**: Zainstaluj globalnie:
  ```
  npm install -g detox-cli
  ```

- Android Studio (dla Androida) lub Xcode (dla iOS),
- Emulator Androida lub symulator iOS.

Uruchamianie testów
jeżeli używasz domyslnej konfiguracji package.json możesz użyć komendy
```
yarn e2e:build-ios-debug
yarn e2e:test-ios-debug
```
jeżeli z używasz innego package.json postępuj zgodnie z instrukcją
Budowanie aplikacji
Dla iOS:
```
detox build -c ios.sim.debug
```

Dla Androida:
```
detox build -c android.emu.debug

```
Uruchamianie testów
```
detox test -c <konfiguracja>
```
> [!WARNING]
Zamień <konfiguracja> na ios.sim.debug lub android.emu.debug.

 
