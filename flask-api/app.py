from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from pinecone import ServerlessSpec
from pinecone import Pinecone
import torch
import os
import json

app = Flask(__name__)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = SentenceTransformer('all-MiniLM-L6-v2', device=device)

api_key = 'd9ba3ead-959b-40ff-985b-9532080af87a'
pc = Pinecone(api_key=api_key)

index_name = 'sematic-search'
cloud = os.environ.get('PINECONE_CLOUD') or 'aws'
region = os.environ.get('PINECONE_REGION') or 'us-east-1'

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=model.get_sentence_embedding_dimension(),
        metric='cosine',
        spec=ServerlessSpec(cloud=cloud, region=region)
    )

# Connect to the index
index = pc.Index(index_name)

print(index.describe_index_stats())


@app.route('/query', methods=['POST'])
def query_index():
    try:
        # Get query from request
        query = request.json.get('query', '')
        xq = model.encode(query).tolist()
        xc = index.query(vector=xq, top_k=5, include_metadata=True)
        response = []
        for x in xc.matches:
            response.append({
            "id": x.id,
            "metadata": x.metadata,
            "score": x.score
        })
        return json.dumps(response, indent=2, default=str)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':

    app.run(host='127.0.0.1', port=5000)
