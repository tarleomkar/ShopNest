Postman test steps for the OTP flow
Use these in order.

1) Start the backend
Run the server from the server folder:

You should see the backend running on:

2) Register a new user
Create a new request in Postman:

Method: POST
URL: http://localhost:5000/api/auth/register
Body (JSON):

Expected result:

Status: 201
Response will say an OTP was sent
The OTP will be emailed to the provided address
3) Verify the OTP
Create another request:

Method: POST
URL: http://localhost:5000/api/auth/verify-otp
Body:

Use the actual 6-digit OTP from the email.

Expected result:

Status: 200
Response includes a JWT token and success message
4) Try login
Create another request:

Method: POST
URL: http://localhost:5000/api/auth/login
Body:

Expected result:

Status: 200
You receive a token if verification succeeded
5) Resend OTP if needed
If the OTP expires or you didn’t receive it:

Method: POST
URL: http://localhost:5000/api/auth/resend-otp
Body:

Expected result:

Status: 200
A new OTP gets sent to the email
Important notes
The OTP expires after 1 minute.
If you try to verify after expiry, you will get a 410 response.
If you enter the wrong OTP, you will get a 401 response.
If email is not sending
Check these:

Gmail app password is configured correctly
Environment variables are set:
EMAIL_USER
EMAIL_PASS
If you want, I can also give you a ready-made Postman collection JSON for these requests.