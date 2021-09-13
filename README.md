# Trade Assignment

## Steps to setup the workspace:
1. Make sure to have node version > 8 installed on the machine.
2. Clone/ Download the code from the repository (Refer [git clone](https://github.com/git-guides/git-clone) command)
3. Install the code base using the command: **npm install**
4. The code runs on a in-memory database (nano-SQL on SQLLite version).
5. The install command will build and prepare the workspace to run the code.
6. To run the code use the command: npm start
7. To run the jest test cases run the command - **npm run test**

## Running the app and commands:
1. When the application is started the in memory database is pre-polated with some dummy data.
2. The command to view the current data:  **http://localhost:3000/getAllItems**
3. Updating/ Adding data can be done via post request. We can use postman or curl for the same. Sample url below:<br/>
   Post Request - **http://localhost:3000/insertItem**  <br/>
   Post JSON Data - <br/>**{"trade_id":"T6","version":2,"counter_party_id":"CP-3","book_id":"B2","maturity_date":"13/09/2021","created_date":"10/09/2021"}**
   
## Sample Test case coverage report ##
![image](https://user-images.githubusercontent.com/1829280/133018530-c0851162-1189-47a8-b7d3-db712808a15b.png)

