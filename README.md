# Twilio WebRTC SIP Dialer

A simple browser-based WebRTC SIP dialer using Twilio Client SDK, designed to place outbound and receive inbound voice calls.

---

## 🚀 Features

* Place and receive calls using Twilio Programmable Voice
* Supports both phone numbers and Twilio client identities
* Logs SIP status and call events
* Visual dialpad and status panel

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sathishishya/twilio-webrtc-sip-dialer.git
cd twilio-webrtc-sip-dialer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add the following:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_API_KEY=your_api_key
TWILIO_API_SECRET=your_api_secret
TWIML_APP_SID=your_twiml_app_sid
TWILIO_CALLER_ID=your_verified_twilio_number
PORT=3000
```

> ⚠️ Replace `your_...` placeholders with your actual Twilio Console credentials.

### 4. Start the Server

```bash
node server/index.js
```

### 5. Start Ngrok (for public URL)

```bash
ngrok http 3000
```

> Use the generated `https://xxxx.ngrok-free.app` URL in your Twilio Console:
>
> * **TwiML App** Request URL: `https://xxxx.ngrok-free.app/voice`
> * **Phone Number Webhook**: Same URL as above

### 6. Open the App

Visit `http://localhost:3000` or your Ngrok public URL in a browser to use the dialer.

---

## 📄 File Structure

```
project-root/
├── public/
│   └── index.html          # Frontend UI
├── server/
│   └── index.js            # Backend server (Express + Twilio SDK)
├── .env                    # Environment config (excluded from Git)
├── .gitignore
└── README.md
```

---

## 🧪 Test the Dialer

* Enter a verified phone number or client identity in the "To" field
* Click **Place Call**
* Check Twilio Console for call logs and debug if needed

---

## 📞 Troubleshooting

* Make sure `.env` variables are correct
* Ensure Ngrok is running when testing from Twilio
* Check your browser console and Twilio Console logs for errors

---

## 📬 License

MIT

---

For improvements or contributions, feel free to open a pull request! Happy calling! 📱
