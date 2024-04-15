# chat-with-pdf
Chat with a PDF using Langchain


## Infrastructure:

**Tech Stack:** React/NextJS (frontend), Flask (REST API), Langchain (RAG w/ OpenAI, FAISS), Vercel (frontend deployment), Render (server hosting).

**Description of Methodology:**
On the frontend, we created two components, `ChatComponent.js` and `UploadComponent.js` which configure the chat UI and file upload button. When a user sends a message, we send a POST request to the `/predict` endpoint where we load our FAISS vector store, define our retriever, and create a Retrieval Augmented Generation chain using Langchain. We invoke the chain with the user query to obtain a response we send back to the client. The client then adds the AI-generated response to our running list of chat history and displays it on our Chat UI. 

We initialize the vectorstore with the 'Startup Playbook' PDF. However, if a user wants to analyze their own PDF, they can upload it through the 'Choose File' and 'Submit PDF' button. This hits the `/upload` endpoint, where we use a PDFLoader to load and split the user's PDF and replace the content within the current FAISS vectorstore. Users can see when their uploaded document has been ingested through a 3-second success message that pops up below the submit button. Upon page refresh, however, we ensure that we revert our vectorstore to store the default PDF file. Lastly, we also accounted for potential edge cases where users could Submit PDF without a file selected, or try choose a file that is not a PDF file.

## Running Locally:

To run locally, first install the app:

``` 
git clone https://github.com/choonghwanlee/chat-with-pdf.git 
``` 

Then, run the following commands

``` 
cd flask_app
python app.py
``` 

to start the Flask server locally and identify the local URL. 

We want to replace `ENDPOINT_URL` in both files within `react_app/src/components` to the local URL above. 

Then you can run the following commands:

``` 
cd react_app
npm run dev 
```

This should create a localhost URL (likely `localhost:3000`). Open it to test locally.


## Accessing the deployed website:

You can access the deployed app through https://chat-with-pdf-two.vercel.app/. 

If you want to upload your own PDF, you first select the 'Choose File' button to select a PDF from your local directory. After, you can press the 'Submit PDF' button below it to upload it to our vectorstore. 


