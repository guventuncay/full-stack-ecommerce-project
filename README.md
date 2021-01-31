## Full-stack-ecommerce-project
Full stack Angular-Spring Boot E-commerce project

# Running locally
step 1: prepare database
run sql scripts in starter files folder

step 2: run spring boot app
open a terminal
```
git clone https://github.com/guventuncay/full-stack-ecommerce-project
cd full-stack-ecommerce-project/spring\ boot\ backend/
./mvnw package
java -jar target/*.jar
```
You can access spring boot backend here: http://localhost:8080/

step 3: run angular app
open a new terminal
```
cd ../angular\ frontend/
ng serve
```
You can access angular frontend app here: http://localhost:4200/


References:
- Chad Darby, Spring & Hibernate for Beginners, https://www.udemy.com/spring-hibernate-tutorial/
