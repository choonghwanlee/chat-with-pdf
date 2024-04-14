import os
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_community.llms import OpenAI
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import PromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from ingest import ingest_file
load_dotenv()

app = Flask(__name__)
CORS(app)

template = """You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question.
Say that you don't know when asked a question you don't know, do not make up an answer. Be precise and concise in your answer.

{context}

Question: {question}

Helpful Answer:"""

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_API_KEY is None:
    raise ValueError("Please specify OPENAI_API_KEY in .env file")

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

@app.route('/predict', methods=['POST'])
def predict():
    ## only if request.files exist:
    llm = ChatOpenAI(model="gpt-3.5-turbo-0125")
    question = request.form['question']
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.load_local("my_pdf", embeddings)
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    custom_rag_prompt = PromptTemplate.from_template(template)
    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | custom_rag_prompt
        | llm
        | StrOutputParser()
    )
    result = rag_chain.invoke(question)
    return jsonify({'result': result})

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join('./', filename)
    file.save(filepath)
    success = ingest_file(file)
    os.unlink(filepath)
    return "Uploaded successfully", 200

if __name__ == '__main__':
  app.run(debug=True)
