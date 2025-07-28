
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class CoinTransfer(BaseModel):
    address: str
    amount: float

@router.post("/api/infinity-coin/transfer")
def transfer_coin(data: CoinTransfer):
    return {"status": "success", "message": f"{data.amount} InfinityCoin sent to {data.address}"}
