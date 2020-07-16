# kandy-cpaas2-sample-2fa-node

This is an elementary login authentication use case of two-factor authentication via SMS or Email. The main focus of this application is to understand the 2FA flow.

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

## Usage
The application comprises of three simple pages, login, code verification, dashboard/portal
- On opening the application in the browser, the login screen presented. The user needs to enter the `Private project key` / `Private project secret` and click on the `Login` button.
- Once the credentials verified, the verification page presented to user. Here the user has 2 options, either receive 2FA via SMS or via EMAIL. 
- Once select any option user need to enter destination phone number/email for receiving code.
- The user now needs to enter the verification code received in the mentioned phone number or email. And then click `Verify` button.
- The application verifies the entered code. If the code validates, the user will prompted with a success alert `OTP verified successfully`. Else the user will promoted with an error alert `Code invalid or expired`. And required to re-enter the verification code.
