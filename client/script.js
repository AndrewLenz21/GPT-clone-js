// importing our images
import user from "./assets/user.svg";
import gpticon from "./assets/gpticon.svg";
import { marked } from 'marked';

function renderMarkdownText(text) {
  return marked(text);
}
//declaring our containers
const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

//our loader with three points "..."
let loadInterval;
function loader(element) {
  element.textContent = "";
  //function every 300ms => add one point
  loadInterval = setInterval(() => {
    element.textContent = (element.textContent === '...')?'':element.textContent += '.';
  }, 300);
}

//our text typewriter
function typeText(element, text) {
  let index = 0;
  //Write one letter every 20ms
  let interval = setInterval(() => {
    if (index < text.length) {
      // Check if the current part of the text is a code block
      if (text.slice(index, index + 3) === '```') {
        // Find the end of the code block
        const endIndex = text.indexOf('```', index + 3);
        if (endIndex !== -1) {
          const codeBlock = text.slice(index + 3, endIndex);
          const highlightedCode = Prism.highlight(codeBlock, Prism.languages.javascript, 'javascript');
          element.innerHTML += `<pre class="language-javascript"><code>${highlightedCode}</code></pre>`;
          index = endIndex + 3; // Move the index past the code block
        }
      } else {
        element.innerHTML += text.charAt(index);
        index++;
      }
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//creating unique ID for each message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//order our chatContainer
function chatStripe(isAi, value, uniqueId) {
  //template string
  return(
    `
  <div class="wrapper ${isAi && "ai"}">
    <div class="chat">
      <div class="profile">
        <img
          src="${isAi ? gpticon : user}"
          alt="${isAi ? 'gpt-icon' : 'user'}"
        />
      </div>
      <div class="message" id=${uniqueId}>${value}</div>
    </div>
  </div>
  `
  );
}

const handleSubmit = async (e) => {
  //don't reload browser
  e.preventDefault();
  const data = new FormData(form);

  /* user's our chatStripe */
  //user chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  //bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  //automatic scroll messages
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch data from server -> bot's response
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok){
    const data = await response.json();
    const parseData = data.bot.trim();

    typeText(messageDiv, parseData);
  } else {
    const err = await response.json();
    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
}

//call funcion if press submit or press enter key
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    handleSubmit(e);
  }
})