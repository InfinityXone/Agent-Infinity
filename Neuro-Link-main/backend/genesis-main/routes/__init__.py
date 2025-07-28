
from .infinity_coin import router as coin_router

def setup_routes(app):
    app.include_router(coin_router)
