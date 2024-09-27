import tempfile
from .object_store import push_to_object_store
from .tippecanoe import process_geojson
from .wfs_to_geojson import get_geojson_from_wfs


async def create_pm_tiles_for_layer(layer: str, bbox: str = None):
    geojson = get_geojson_from_wfs(layer)
    print('done fetching geojson')
    with tempfile.TemporaryDirectory() as temp_dir:
        pmtiles_path = process_geojson(geojson, temp_dir)
        print(pmtiles_path)
        if pmtiles_path is not None:
            s3_path = await push_to_object_store(pmtiles_path, layer)
            return s3_path
