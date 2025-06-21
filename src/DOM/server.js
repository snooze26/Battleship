//THIS IS MY FIRST TIME EVER WORKING WITH SERVER-SIDE DEVELOPMENT. PLEASE SPARE ME 
//I AM LEARNING AS I AM GOING :) HAD TO SWITCH FROM COMMONJS TO ESM
// import dependencies 
import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import fetch from 'node-fetch'; 
// load enviornment variable
dotenv.config(); 

// create Express app and set port 
const app = express(); 
const port = process.env.PORT || 3000; 

// create Express app and set port 
app.use(cors()); // allows me to to make request to backed from front end 
app.use(express.json()); // parses incoming JSON request bodies 

// POST route to get AI move 
app.post('/api/next-move', async (req, res) => {
    try { 
        const { prompt } = req.body; // calls OPEN API with prompt 

        //validate prompt 
        if (!prompt || typeof prompt !== 'string') { 
            return res.status(400).json({error: `Prompt is required and must be a string`});
        }        
        
        //successful response 
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", 
            headers: { 
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`,
 
            }, 
            body: JSON.stringify({
                model: "gpt-3.5-turbo", 
                messages: [{ role: "user" , content: prompt}],
                temperature: 0.2, 
            }),
        });
        //failed response
        if (!response.ok) { 
            const errText = await response.text();
            return res.status(response.status).json({error: errText});
        }

        const data = await response.json(); 
        res.json(data); 
    
    //any unexpected errors 
    } catch (error) { 
        console.error("Error fetching OpenAi: " , error); 
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 

// start server 
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`); 
})



