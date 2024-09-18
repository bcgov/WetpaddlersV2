import logging
from .pmtiles import create_pm_tiles_for_layer
from .tippecanoe import process_geojson
from .wfs_to_geojson import (
    get_geojson_from_wfs,
    get_feature_count,
    get_feature_response_info,
)
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from .object_store import push_to_object_store
import random
import pdb

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/geo")
async def geo(geo: dict, response: Response):
    logger.info("New geo posted: %s", str(geo))
    process_geojson(geo)
    name=geo.get("name", str(random.randint(0,99999999)))
    object_store_url = await push_to_object_store(name)
    return {"object_store_url": object_store_url}


@app.post("/WFSTOGEOJSON")
async def WFSTOGEOJSON(req: dict):
    logger.info(f'Layer: {req.get("layer")}')
    geojson = get_geojson_from_wfs(req.get("layer"), req.get("bbox", None))
    return geojson


@app.get("/get_wfs_feature_count/{layer}")
async def get_wfs_feature_count(layer: str):
    return get_feature_count(layer)


@app.get("/get_wfs_feature_count/{layer}/{bbox}")
async def get_wfs_feature_count_with_filter(layer: str, bbox: str):
    geom = [float(num) for num in bbox.split(",")]
    count = get_feature_count(layer, geom)
    return {"count": count}


@app.get("/wfs_get_feature_info/{layer}")
async def wfs_get_feature_info(layer: str):
    return get_feature_response_info(layer)


@app.get("/wfs_get_feature_info/{layer}/{bbox}")
async def wfs_get_feature_info_with_filter(layer: str, bbox: str):
    geom = [float(num) for num in bbox.split(",")]
    return get_feature_response_info(layer, geom)


@app.post("/create_pm_tiles")
async def create_pm_tiles(req: dict):
    pm_tiles_key = await create_pm_tiles_for_layer(
        req.get("layer"), req.get("bbox", None)
    )
    return {"s3_key": pm_tiles_key}
