# kandy-cpaas2-sample-2fa-node
​
This is an elementary login authentication use case of two-factor authentication via SMS or Email. The main focus of this application is to understand and implement the 2FA flow, so least amount of stress is given to the authentication/login mechanism.
​
## Installation
1. To install dependencies, run
```bash
npm install @kandy-io/cpaas-nodejs-sdk --save
npm install
```
2. To start the server, run
```bash
npm start
```
​
## Usage
The application comprises of three simple pages, login, code verification, dashboard/portal
- On opening the application in the browser, the login screen is presented. The user needs to enter the `Private project key` / `Private project secret` and click on the `Login` button.
- Once the credentials are verified, the verification page is presented to user. Here the user has 2 options, either receive 2FA via SMS or via EMAIL. 
- Once select any option user need to enter destination phone number/email for receiving code.
- The user now needs to enter the verification code received in the mentioned phone number or email and click `Verify` button.
- The application verifies the entered code. If the code validates, the user will prompted with a success alert `OTP verified successfully` else the user will be promoted with an error alert `Code invalid or expired` and is required to re-enter the verification code.