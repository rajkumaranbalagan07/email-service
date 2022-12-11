## Setup
    git clone [https://github.com/AjayRajkumar/email-service.gitgit ](https://github.com/rajkumaranbalagan07/email-service)
    cd email-service
    npm i 
    npm start 
    npm run test 

## SendGrid & MailGun Setup 
##### Create  SendGrid & MailGun accounts replace the API KEYS in the .env

## Input Validation
##### /sendEmail request payload values are validate using the class-validator (NestJS framework support) . from, to ,cc,bcc should be mail ids & subject,body keys are should be text values.

## Error Handling
##### Error handling is done for all the cases using promise & try catch blocks.

## Technical choices
  - NestJs Framework - Stable, Battle Tested, Full Typesript Support, Brings Enterprise Support 
  - Databases - Postgress to store the audit record for all the emails 
  - Architecture - SOLID principles a Singleton & Factory algorithams 
  
## Correctness
  - Commented DB configuration & setup so that interviewer can test easily
  - Followed OOPS concepts & SOLID design principles.
  - Used Singleton & Factory data structures whenever needed.
