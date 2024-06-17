# 🎓 Lern-Fair File Sharing Frontend 🚀


## 🛠️ Setup Instructions
##### 1. Clone the Repository
First, clone the repository to your local machine using the following command:
```
git clone https://github.com/lern-fair-file-sharing/app
cd app
```
##### 2. Install Dependencies
Make sure you have Node.js installed. Then, install the required dependencies:
```
npm install
```
##### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following environment variables (these are our development variables, for production please replace):
```env
EXPO_PUBLIC_HOST_PORT=8080
EXPO_PUBLIC_USER=testuser
EXPO_PUBLIC_TOKEN="dGVzdHVzZXI6MTIzNA=="
```

## 🏃 Run Application
Now, you can start the Expo development server:

##### Option 1: Using the Expo Go App
```
npm start --tunnel
```
Scan the QR code.

##### Option 2: Using the Anrdoid Studio Emulator
Please follow the Android Studio instructions for installing an Android or iPhone emulator. If installed run the following command:
```
npm run android
# or
npm run ios
```
