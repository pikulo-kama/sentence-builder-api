FROM maven:3.6.3-jdk-11 AS build

RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -f pom.xml clean package -DskipTests

FROM openjdk:11-jre-slim
COPY --from=build /workspace/target/*.jar application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]