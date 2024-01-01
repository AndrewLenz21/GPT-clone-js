# Setting Up server

1. Create the `server` folder
	Go to folder
	```cmd
	cd server
	```
	Generate the `package.json` file
	```cmd
	npm init -y
	```
	
2. Once we have the `package.json` file, we need to install some dependecies
	Install using npm
	```cmd
	npm install cors dotenv express nodemon openai
	```
	* `cors`: cross origin request
	* `dotenv`: securing variables
	* `express`: back-end framework
	* `nodemon`: keep application running
	* `openai`: to use our API key
3. After install the packager, we can create the `server.js` file and start coding our back-end side.