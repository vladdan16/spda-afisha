plugins {
    java
    checkstyle
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.vladdan16.spda_afisha"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
//    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-configuration-processor")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.4.0")
//    implementation("io.micrometer:micrometer-registry-prometheus:1.12.4")
//    implementation("io.micrometer:micrometer-tracing-bridge-brave:1.2.4")
//    implementation("org.liquibase:liquibase-core")

    compileOnly("org.projectlombok:lombok")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    developmentOnly("org.springframework.boot:spring-boot-docker-compose")

    runtimeOnly("org.postgresql:postgresql")

    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test")

    checkstyle("com.puppycrawl.tools:checkstyle:10.10.0")
}

checkstyle {
    configFile = rootProject.file("checkstyle.xml")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
