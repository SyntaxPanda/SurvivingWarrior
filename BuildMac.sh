cd frontend
npm ci
npm run build
rm -rf ../backend/src/main/resources/static
cd ../backend
./mvn clean package
cd ..
docker build -t SurvivingWarrior .