const dotenv = require('dotenv')
const express = require('express')
const path = require('path')

const {
  createClient
} = require('@kandy-io/cpaas-nodejs-sdk')

const {
  validCredentials
} = require('./utils')

dotenv.config()

const server = express()
const port = process.env.PORT || '8000'

let client;

server.use(express.static(path.join(__dirname, '/public')))
server.use(express.json())
server.use(express.urlencoded({
  extended: true
}))
server.set('view engine', 'ejs')

server.route('/login')
  .get((_req, res) => {
    if (isLoggedIn()) {
      // If user is logged in and trying to access login page, redirect to dashboard.
      return res.redirect('/dashboard')
    }

    setDefaultState()

    res.render('pages/login')
  })
  .post(async (req, res) => {

    let baseUrl = req.body.baseUrl;
    let key = req.body.privateProjectKey;
    let secret = req.body.privateProjectSecret;

    if (baseUrl == undefined || baseUrl.length < 1) {
      res.redirect(302, '/?error=Please enter Base Url');
      return;
    }

    if (key == undefined || key.length < 1) {
      res.render('pages/login', {
        alert: {
          message: "Please enter Private Project Key",
          type: 'error'
        }
      })
      return;
    }

    if (secret == undefined || secret.length < 1) {
      res.render('pages/login', {
        alert: {
          message: "Please enter Private Project Secret",
          type: 'error'
        }
      })
      return;
    }

    client = await createClient({
      clientId: key,
      clientSecret: secret,
      baseUrl: baseUrl
    })

    res.render('pages/dashboard')
  })

server.route('/auth-via-sms').get(async (_req, res) => {
  res.render('pages/verify-via-sms')
})

server.route('/send-otp-via-sms')
  .post(async (req, res) => {

    try {
      const response = await client.twofactor.sendCode({
        destinationAddress: req.body.number,
        method: 'sms',
        message: 'Your verification code {code}'
      })

      setCodeId(response.codeId)

      setCredentialsVerified()
      // If the login credentials are verified, user is redirected to code verification page.
      res.render('pages/verify', {
        alert: {
          message: 'Verification code has been sent to your phone number',
          type: 'success'
        }
      })
    } catch (error) {
      // Here something went wrong either the server or proper parameters were not passed.
      const {
        message,
        name,
        exceptionId
      } = error
      const errorMessage = `${name}: ${message} (${exceptionId})`

      // Received error message is echoed back to the UI as error alert.
      res.render('pages/login', {
        alert: {
          message: errorMessage,
          type: 'error'
        }
      })
    }
  })

server.route('/verify-otp')
  .post(async (req, res) => {

    try {
      const response = await client.twofactor.verifyCode({
        codeId: codeId(), // codeId() fetches saved codeId from the server instance. Check 'Helper methods' below for reference.
        verificationCode: req.body.code
      })

      if (response.verified) {
       res.render('pages/verify', {
          alert: {
            message: 'OTP verifies successfully',
            type: 'success'
          }
        })
      } else {
        // The code is invalid and error message received from server is shown as error alert.
        res.render('pages/verify', {
          alert: {
            message: response.message,
            type: 'error'
          }
        })
      }
    } catch (error) {
      const {
        message,
        name,
        exceptionId
      } = error
      const errorMessage = `${name}: ${message} (${exceptionId})`

      res.redirect('/verify', {
        alert: {
          message: errorMessage,
          type: 'error'
        }
      })
    }
  })

server.route('/auth-via-email').get(async (_req, res) => {
  res.render('pages/verify-via-email')
})

server.route('/send-otp-via-email').post(async (req, res) => {
  
  console.log("parameters email  "+ req.body.emailaddress);

  try {
    const response = await client.twofactor.sendCode({
      destinationAddress: req.body.emailaddress,
      method: 'email',
      length: 10,
      message: 'Your verification code {code}',
      subject: 'Verification code',
      type: 'alphanumeric',
      expiry: 3600
    })
    console.log("parameters "+ response);
    setCodeId(response.codeId)
    
    setCredentialsVerified()

    res.render('pages/verify', {
      alert: {
        message: 'Verification code has been sent to your Email ID',
        type: 'success'
      }
    })
  } catch (error) {
    console.log("error",error)
    const {
      message,
      name,
      exceptionId
    } = error
    const errorMessage = `${name}: ${message} (${exceptionId})`

    // Received error message is echoed back to the UI as error alert.
    res.render('pages/login', {
      alert: {
        message: errorMessage,
        type: 'error'
      }
    })
  }
})


server.route('/verify-otp-via-sms').post(async (req, res) => {

  try {
    const response = await client.twofactor.verifyCode({
      codeId: codeId(), // codeId() fetches saved codeId from the server instance. Check 'Helper methods' below for reference.
      verificationCode: req.body.emailcode
    })

    if (response.verified) {
      login()
      res.render('pages/dashboard')
    } else {
      res.render('pages/verify-email-otp', {
        alert: {
          message: response.message,
          type: 'error'
        }
      })
    }
  } catch (error) {
    const {
      message,
      name,
      exceptionId
    } = error
    const errorMessage = `${name}: ${message} (${exceptionId})`

    res.redirect('/verify-email-otp', {
      alert: {
        message: errorMessage,
        type: 'error'
      }
    })
  }
})

server.route('/dashboard')
  .get((_req, res) => {
    res.render('pages/dashboard')
  })

server.route('/logout')
  .get((_req, res) => {
    // Login data is cleared
    logout()
    res.redirect('/login')
  })

server.get('/', (_req, res) => {
  res.redirect('/login')
})

server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
})

/**
  Helper methods
*/

const isLoggedIn = () => {
  return server.get('credentialsVerified') && server.get('codeVerified')
}

const credentialVerified = () => {
  return server.get('credentialsVerified') && !server.get('codeVerified')
}

const logout = () => {
  setDefaultState()
}

const setDefaultState = () => {
  server.set('credentialsVerified', false)
  server.set('codeVerified', false)
}

const setCredentialsVerified = () => {
  server.set('credentialsVerified', true)
  server.set('codeVerified', false)
}

const login = () => {
  server.set('credentialsVerified', true)
  server.set('codeVerified', true)
}

const setCodeId = (codeId) => {
  server.set('codeId', codeId)
}

const codeId = () => {
  return server.get('codeId')
}