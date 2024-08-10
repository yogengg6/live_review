# live_review
To Setup the application 

#### BACKEND #####
STEP 1) 
Add .env file as below 

### ENV FILE FOR BACKEND STARTS ###
DB_CREAD=mongodb://localhost:27017/DB_NAME
DB_NAME=LiveReviews
REACT_APP_URI=http://localhost:3000
### ENV FILE FOR BACKEND ENDS ###

STEP 2)
cd backend/
npm i
npm start

Backend Will start on PORT: 2000

#### FRONTEND #####
STEP 1) 
Add .env file as below 

### ENV FILE FOR FRONTEND STARTS ###
REACT_APP_API_URL=http://localhost:2000
### ENV FILE FOR FRONTEND ENDS ###

STEP 2) 
cd frontend/
npm i
npm start

Frontend Will start on PORT: 3000



