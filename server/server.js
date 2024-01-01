import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

//Get the secret key from dotenv
dotenv.config();

//OpenAI configuration
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}); 

//Initialize express application
const app = express();

app.use(cors()); //Allow our server to be called from our frontend
app.use(express.json()); //Allow us to pass json content

//Creating our requests
app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Codex",
  });
});
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({error});
  }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));