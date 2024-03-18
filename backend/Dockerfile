FROM gradle:8.6.0-jdk21 AS build
WORKDIR /backend
COPY settings.gradle.kts .
COPY build.gradle.kts .
COPY checkstyle.xml .
COPY src ./src
RUN gradle build --no-daemon

FROM openjdk:21-oracle
WORKDIR /backend
COPY --from=build /backend/build/libs/*.jar backend.jar
CMD java -jar backend.jar
