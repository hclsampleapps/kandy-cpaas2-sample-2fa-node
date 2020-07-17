# kandy-cpaas2-sample-2fa-node

This is an elementary login authentication use case of two-factor authentication via SMS or Email. The main focus of this application is to understand the 2FA flow.

## Development
These instructions will get you a copy of the project. Running on your local machine for development and testing purposes.

### Prerequisites
Your system should have the following installed to complete pass this project:
- [NodeJS](https://nodejs.org/en/) >= 10.15.0
- Chrome browser - Last 3 major version

### Setup
To setup the project repository, run these commands
```bash
git clone https://github.com/hclsampleapps/kandy-cpaas2-sample-2fa-node.git
cd kandy-cpaas2-sample-2fa-node
```

### Installation
1. To install dependencies, run
```bash
npm install @kandy-io/cpaas-nodejs-sdk --save
npm install
```
2. To start the server, run
```bash
npm start
```

### Branching strategy
To learn about the branching strategy, contribution & coding conventions followed in the project. Please refer [GitFlow based branching strategy for your project repository](https://gist.github.com/ribbon-abku/10d3fc1cff5c35a2df401196678e258a)

## Usage
The application comprises of three simple pages, login, code verification, dashboard/portal
- On opening the application in the browser, the login screen presented. The user needs to enter the `Private project key` / `Private project secret` and click on the `Login` button.
- Once the credentials verified, the verification page presented to user. Here the user has 2 options, either receive 2FA via SMS or via EMAIL. 
- Once select any option user need to enter destination phone number/email for receiving code.
- The user now needs to enter the verification code received in the mentioned phone number or email. And then click `Verify` button.
- The application verifies the entered code. If the code validates, the user will prompted with a success alert `OTP verified successfully`. Else the user will promoted with an error alert `Code invalid or expired`. And required to re-enter the verification code.
