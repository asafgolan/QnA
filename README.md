# QnA
### node.js express 

### Prerequisits

Npm
Node
mogodb instance with a mongoDB URI connection string  

### Deployment

- open terminal
- clone repo
- cd repo directory
- npm install
- create .env file in root directory and set ENVIRONMENT vars in .env file 
```
  DATABASE= mongodb+srv://<dbuser>:<password>@qna.odwv8.mongodb.net/<dbname>?retryWrites=true&w=majority //MONGO ATLAS DB example connection string
  PORT=8000
  JWT_SECRET=hdfsajkfhlsdkja
```
  
- from project root run  ```$ npm start```

### Usage  : 

```defualt API endpoint localhost:8000``

### Auth Routes

- #### user signup ``` POST api/signup ```
  - REQUEST role set to 1 is admin
  ```
  {
    "name" : "asaf",
    "email" : "asaf@golan.com",
    "password" : "123123",
    "role": 1
  }
  ```
  - RESPONSE
  ```
  {
    "user": {
        "role": 1,
        "history": [],
        "_id": "60fbe8054eefed45184e173a",
        "name": "asaf",
        "email": "asaf@golan.com",
        "createdAt": "2021-07-24T10:14:29.112Z",
        "updatedAt": "2021-07-24T10:14:29.112Z",
        "__v": 0
    }
  }
  ```
  
  - #### user signup ``` POST api/signin ```
  - REQUEST
  ```
  {
    "email" : "asaf@golan.com",
    "password" : "123123"
  }
  ```
  - RESPONSE
  ```
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZiZTgwNTRlZWZlZDQ1MTg0ZTE3M2EiLCJpYXQiOjE2MjcxMjE2ODl9.uVaVXMDllIwQFAnZXIkd_u1dIA2aj3DObAZ4nIyDbVc",
    "user": {
        "_id": "60fbe8054eefed45184e173a",
        "email": "asaf@golan.com",
        "name": "asaf",
        "role": 1
     }
  }
  ```

 ### * userId is returned at signin
 ### * for admin routes add also header Authorization = Bearer + token from user signin

###  Admin Category Routes
 
- ####  create category ```POST api/category/create/:userId ```
  - REQUEST 
  ```
  {
    "type":"trivia",
    "answerRequired" : true
  }
  ```
  - RESPONSE
  ```
  {
      "data": {
          "_id": "60fbee484cdb053d740a41c9",
          "type": "trivia",
          "answerRequired": true,
          "createdAt": "2021-07-24T10:41:12.475Z",
          "updatedAt": "2021-07-24T10:41:12.475Z",
          "__v": 0
      }
  }
  ```
  
### Admin Question Routes  
  - #### question create  ```POST api/question/:categoryId/:userId ```
    - REQUEST
    ```
    {
     "question" : "was sharon a good PM ?",
     "options": [
            {
                "option": "1",
                "isCorrect": false
            },
            {
                "option": "2",
                "isCorrect": true
            },
            {
                "option": "3",
                "isCorrect": false
            },
            {
                "option": "3",
                "isCorrect": false
            }
        ] 
    }
    ```
    - RESPONSE
    ```
    {
      "questionId": "60fc0bb74ff0a457706c1ace"
    }
    ```
    
 ### User Question Routes  
  
  - ####  get question data ```GET api/question/:questionId ```
    - RESPONSE
    ```
    {
        "_id": "60fbecfa01bd4c75a0d35d69",
        "question": "was sharon a good PM ?",
        "options": [
            {
                "count": 0,
                "_id": "60fbecfa01bd4c75a0d35d6a",
                "option": "1",
                "isCorrect": false
            },
            {
                "count": 0,
                "_id": "60fbecfa01bd4c75a0d35d6b",
                "option": "2",
                "isCorrect": true
            },
            {
                "count": 0,
                "_id": "60fbecfa01bd4c75a0d35d6c",
                "option": "3",
                "isCorrect": false
            },
            {
                "count": 0,
                "_id": "60fbecfa01bd4c75a0d35d6d",
                "option": "3",
                "isCorrect": false
            }
        ],
        "category": "60fbea764eefed45184e1758",
        "createdAt": "2021-07-24T10:35:38.554Z",
        "updatedAt": "2021-07-24T10:35:38.554Z",
        "__v": 0
    }
    ```
  - ####  answer/vote a question  ```PUT api/question/:questionId/:answerId ```
    - REQUEST
    ```
    {
        "action" : "vote"
    }
    ```
    - RESPONSE
    ```
    12 // number of times answer was voted
    ```
