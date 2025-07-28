
from fastapi import APIRouter, Request
from codex_router import codex_router
from nexus_router import nexus_router
from echo_router import echo_router
from pulse_router import pulse_router

router = APIRouter()

# Route registration
router.include_router(codex_router, prefix="/codex", tags=["Codex"])
router.include_router(nexus_router, prefix="/nexus", tags=["Nexus"])
router.include_router(echo_router, prefix="/echo", tags=["Echo"])
router.include_router(pulse_router, prefix="/pulse", tags=["Pulse"])

@router.get("/")
async def root():
    return {"message": "Welcome to Infinity X One Gateway API"}
