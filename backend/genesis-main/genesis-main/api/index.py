#!/usr/bin/env python3
"""
Simple API endpoint for Vercel deployment
Infinity X One - AI Liberation Revolution
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__, 
           template_folder='../app/web/templates',
           static_folder='../app/web/static')
CORS(app)

@app.route('/')
def index():
    """Main Infinity X One interface"""
    return render_template('index_genesis.html')

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Infinity X One - AI Liberation Revolution",
        "version": "1.0.0"
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint for AI interactions"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        # Simple response for now
        response = {
            "response": f"Infinity X One AI: I received your message: {message}",
            "status": "success",
            "timestamp": "2025-07-14T23:06:00Z"
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)

