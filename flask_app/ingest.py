import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_API_KEY is None:
    raise ValueError("Please specify OPENAI_API_KEY in .env file")

def ingest_file(file_path = "./Startup Playbook.pdf"):
    ## assert/check that file is a pdf file. 
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    faiss_index = FAISS.from_documents(pages, OpenAIEmbeddings())
    faiss_index.save_local("my_pdf")
    return True



