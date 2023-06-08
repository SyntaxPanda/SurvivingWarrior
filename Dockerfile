FROM openjdk:17

EXPOSE 8080

ADD backend/target/SurvivingWarrior.jar SurvivingWarrior.jar

CMD [ "sh", "-c", "java -jar /SurvivingWarrior.jar" ]