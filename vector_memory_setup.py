
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
import os

# Directory and collection setup
VECTOR_DB_DIR = "vector_store"
VECTOR_COLLECTION = "infinity_x_one_memory"

# Initialize embedding model
embedding_model = OpenAIEmbeddings()

# Create or load vector DB
def get_vector_memory():
    vectordb = Chroma(
        collection_name=VECTOR_COLLECTION,
        embedding_function=embedding_model,
        persist_directory=VECTOR_DB_DIR
    )
    return vectordb
