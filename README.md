# MultiLern
![Multilern - logo](/frontend/assets/mini-multilern-logo.png)

Multilern to innowacyjna platforma edukacyjna która ma na celu ułatwienie procesu nauki w szkole. Aplikacja umożliwia uczniom tworzenie i zarządzanie notatkami oraz fiszkami, które pomagają w efektywnej nauce materiału. Dodatkowo, użytkownicy mogą wyszukiwac rozwiązania do zadań, a także tworzyć nowe zapytania i posty, na które moga odpowiadać inni użytkownicy. Najważniejszą funkcjonalnościa Multilerna jest udostępnianie tzw. "pewniaków sprawdzianowych", czyli zestawu zadań, które najprawdopodobniej pojawią się na sprawdzianach. W przyszłości planujemy wprowadzić dodatkowe funkcje, takie jak chat oraz korepetycje, a także płatny pakiet premium, który da użytkownikom dostęp do zaawansowanych opcji


## Jak uruchomić?
1. Pobierz repozytorium i zainstaluj paczki
```
yarn // w obu projektach trzeba wywołac komendę
```
2. W folderze backend oraz frontend ustaw DATABASE_URL w pliku env
  - jeżeli używasz własnej bazy to ustaw ją według poniższej instrukcji i zaimportuj plik multilern.sql
  ```
  DATABASE_URL="mysql://user:password@localhost:3306/databaseName"
  ```
  - jeżeli chcesz używac bazy serwerowej ustaw taki
  ```
  DATABASE_URL="mysql://u7erzleedh7bprol:N7GTEkJvZ7mFM0NQtKgg@bk0ygxf04u4ha7pfwfra-mysql.services.clever-cloud.com:3306/bk0ygxf04u4ha7pfwfra"
  ```
  > [!WARNING]
  > Serwer posiada ograniczoną ilość połączeń dlatego czasem mogą być wyrzucane błędy 500
3. Z poziomu folderu backend wywołaj komenda
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
