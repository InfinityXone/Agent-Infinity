from fastapi import APIRouter
codex_router = APIRouter()

@codex_router.post('/codex')
def run_codex():
    return {'status': 'Codex response active'}