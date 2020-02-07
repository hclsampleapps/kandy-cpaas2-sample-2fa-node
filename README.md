# kandy-cpaas2-sample-2fa-node

2FA app based on node.js, is used to create communication channel between two users via 2FA APIs

## Setup & Run

Install dependencies via

	npm install

Start the server via

	npm start

## Usage

### Login

There are three fields in the form

1. **Base Url**: Enter base url.
2. **Private Project Key**: Enter private project key.
3. **Private Project Secret**: Enter private project secret value.

### Dashboard

There are 2 options

1. Email
2. SMS

### Send OTP Verification

1. **Phone number**: The phone number where the OTP is to be sent and do submit.
2. **Verification code**: Enter the received OTP to verify OTP.

### Email OTP Verification

1. **Email Address**: Enter the email id where the OTP is to be sent and do submit.
2. **Verification code**: Enter the received OTP to verify OTP.