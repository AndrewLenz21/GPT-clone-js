# Starting project

- Verify if we have `node.js` installed:
```cmd
node -v
```
- Create a vanilla template using Vite.js
```cmd
npm create vite@latest client --tenplate vanilla
```
- Select the options:
	1. Select a framework: `Vanilla`
	2. Select a variant: `JavaScript`
Now we have our [**Client**](Front-end%20config.md) folder ready. [Go to Front-end config](Front-end%20config.md). 
For the [**Server**](Back-end%20config.md), just create new folder with name: `server`. [Go to Back-end config](GPT-clone-js-MD/client/Back-end%20config.md)

---
# NPM

1. Install all the neccesary packages
	Go to folder
	```cmd
	cd client
	```
	Install `npm`
	```cmd
	npm install
	```
2. Delete the `counter.js` file (we don't need it)
3. We can start editing our `index.html` file.
4. Remember to put our `favicon.ico` inside the `<head>`, into the `<link>` tag:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
```
5. To highlight our code we will use prism
	```cmd
	npm install prismjs
	```
To return into the main folder
```cmd
cd..
```
