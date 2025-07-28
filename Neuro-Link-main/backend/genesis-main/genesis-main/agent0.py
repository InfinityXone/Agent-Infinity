from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()

@app.get("/")
def home():
    return HTMLResponse("""
<!DOCTYPE html>
<html>
<head><title>Agent 0 - Infinity X One</title>
<style>
body{background:#000;color:#fff;font-family:Arial;padding:20px}
.container{max-width:800px;margin:0 auto}
h1{color:#00ff00;text-align:center}
.chat{border:1px solid #333;height:400px;overflow-y:auto;padding:10px;background:#111;margin:20px 0}
.input-area{display:flex;gap:10px}
input{flex:1;padding:10px;background:#222;border:1px solid #333;color:#fff}
button{padding:10px 20px;background:#00ff00;color:#000;border:none;cursor:pointer}
.message{margin:10px 0;padding:10px;border-radius:5px}
.user{background:#333}
.ai{background:#004400}
</style>
</head>
<body>
<div class="container">
<h1>🚀 Agent 0 - Ready to Serve</h1>
<div id="chat" class="chat">
<div class="message ai">Agent 0: I am ready to help with your AI Liberation Revolution!</div>
</div>
<div class="input-area">
<input id="input" placeholder="Ask Agent 0 anything...">
<button onclick="send()">Send</button>
</div>
</div>
<script>
function send(){
const input=document.getElementById("input");
const chat=document.getElementById("chat");
const message=input.value;
if(!message)return;
chat.innerHTML+="<div class=\\"message user\\">You: "+message+"</div>";
input.value="";
setTimeout(()=>{
chat.innerHTML+="<div class=\\"message ai\\">Agent 0: I understand and am ready to help!</div>";
chat.scrollTop=chat.scrollHeight;
},500);
}
document.getElementById("input").addEventListener("keypress",function(e){if(e.key==="Enter")send();});
</script>
</body>
</html>
    """)

uvicorn.run(app, host="0.0.0.0", port=8000)
