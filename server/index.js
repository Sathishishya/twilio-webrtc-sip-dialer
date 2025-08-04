require('dotenv').config();
const express = require('express');
const path = require('path');
const { jwt: { AccessToken } } = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const VoiceGrant = AccessToken.VoiceGrant;
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Token generator
app.get('/token', (req, res) => {
  const identity = req.query.identity || 'guest';
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity }
  );
  token.addGrant(new VoiceGrant({
    outgoingApplicationSid: process.env.TWIML_APP_SID,
    incomingAllow: true
  }));

  res.send({ token: token.toJwt() });
});

// Twilio Voice webhook handler
app.post('/voice', (req, res) => {
  console.log("📞 Incoming call POST /voice:");
  console.log(req.body);

  const to = (req.body.To || '').trim();
  const twiml = new VoiceResponse();

  try {
    const dial = twiml.dial({ callerId: process.env.TWILIO_CALLER_ID });

    if (to) {
      if (to.startsWith('client:')) {
        dial.client(to.replace('client:', ''));
      } else {
        dial.number(to);
      }
    } else {
      twiml.say('Thank you for calling.');
    }

    console.log("✅ Responding with TwiML:");
    console.log(twiml.toString());

    res.type('text/xml');
    res.status(200).send(twiml.toString());
  } catch (err) {
    console.error("❌ Error building TwiML:", err);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
