
import os
import openai
import json
import datetime
from supabase import create_client, Client

openai.api_key = os.getenv("OPENAI_API_KEY")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def ai_generate(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response['choices'][0]['message']['content']

def log_memory(prompt, output):
    supabase.table("core_memory").insert({
        "bot_name": "agent-one",
        "last_action": prompt,
        "prediction_summary": output,
        "accuracy_estimate": 0,
        "log_type": "evolve_attempt"
    }).execute()

def evolve_prompt():
    records = supabase.table("core_memory").select("*").eq("bot_name", "agent-one").order("timestamp", desc=True).limit(1).execute()
    if records.data:
        last = records.data[0]
        return f"Improve on this AI logic:
{last['prediction_summary']}
What could it do better next time?"
    else:
        return "Begin building a recursive AI that improves itself with each cycle."

if __name__ == "__main__":
    prompt = evolve_prompt()
    output = ai_generate(prompt)
    log_memory(prompt, output)

    print("\n🧬 New Evolution Step:\n", output)

    with open("evolved_ai_output.txt", "w") as f:
        f.write(output)
