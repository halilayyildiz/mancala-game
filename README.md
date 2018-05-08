# Mancala Game
Standard Implemenation of Mancala Game

## About
This application simply implements 6-stone version of Mancala Game. Players can play this game via web based user interface.
Please see [WikiPedia](http://en.wikipedia.org/wiki/Mancala) page for more information about the game.

## Demo
Application is hosted on DigitalOcean Ubuntu droplet. You can access the demo app via the link below:

[Mancala Game Demo](http://mancala.halilayyildiz.com/)





## Technology Stack
Component         | Technology
---               | ---
Frontend          | [Angular 4](https://github.com/angular/angular), [PrimeNG](https://www.primefaces.org/primeng/), [OpenLayers](https://openlayers.org/)
Backend           | [Spring Boot](https://projects.spring.io/spring-boot/)
Security          | Not Implemented
Persistence       | [H2](http://www.h2database.com/) in-memory database
Client Build Tools| [angular-cli](https://github.com/angular/angular-cli), [npm](https://www.npmjs.com/)
Server Runtime    | [Nginx](https://www.nginx.com/)



## Missing Features
- Websocket Communication (this application simply use client side polling)
- Persistent Database (data is not persisted in this version)
- Authentication/Authorization (not implemented)
- API documentation

## How to build & run

> Notice:
> Server should have installed Java 8+ and Node.js 9+ runtime environment.

Project has Maven based modular structure. In order to build project, under "code" folder simply run:

```bash
# Navigate to PROJECT_FOLDER/code (should contain pom.xml) and then
mvn clean package
```
This command will simply build both backend and frontend project, run unit tests and create executable jar binary. Then navigate to backend folder and run:

```bash
# Navigate to PROJECT_FOLDER/code/mancala-backend/target and then
java -jar mancala-backend-1.0-SNAPSHOT.jar
```
Then navigate to your web browser and type:
```bash
http://localhost:8080
```
That's it !



