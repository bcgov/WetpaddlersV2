import urllib3

WFS_BASE_URL = "https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=2.0.0&request=GetFeature&outputFormat=json&srsName=EPSG:4326"

http = urllib3.PoolManager()


def build_get_feature_url(layer: str, bbox: list[float]) -> str:
    """Generate a WFS GetFeature URL for the given layer name and optional bounding box."""
    wfs_url = f"{WFS_BASE_URL}&typeName={layer}"
    if bbox is not None and len(bbox) == 4:
        bbox_str = f"&bbox={','.join(str(b) for b in bbox)}"
        bbox_str += ",EPSG:4326"
        wfs_url += bbox_str
    return wfs_url


def get_feature_response_info(layer: str, bbox: list[float] = None):
    """
    Get the number of features and estimated content size.
    """
    wfs_url = build_get_feature_url(layer, bbox)
    try:
        response = http.request("GET", wfs_url)
        geojson = response.json()
        feature_count = geojson["totalFeatures"]
        size = len(response.data)
        return {"count": feature_count, "size": size}
    except:
        return {"error": "Unable to get feature response info."}


def get_feature_count(layer: str, bbox: list[float] = None) -> int:
    """
    Get the number of features in the WFS
    """
    wfs_url = build_get_feature_url(layer, bbox)
    wfs_url += "&count=1"
    try:
        response = http.request("GET", wfs_url)
        geojson = response.json()
        feature_count = geojson["totalFeatures"]
        return feature_count if feature_count is not None else 0
    except:
        return 0


def get_geojson_from_wfs(layer: str, bbox: list[float] = None) -> dict:
    """
    Get the geojson from the WFS service
    Sample request URL: https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=pub:WHSE_LAND_AND_NATURAL_RESOURCE.PROT_CURRENT_FIRE_POLYS_SP&bbox=-139.06,48.3,-114.03,50.0,EPSG:4326&outputFormat=json&count=1
    """
    wfs_url = build_get_feature_url(layer, bbox)
    try:
        response = http.request("GET", wfs_url)
        geojson = response.json()
        return geojson
    except Exception as e:
        return {"error": e.message}


def is_valid_url(url: str) -> bool:
    """
    Check if the wfs url is valid
    """
    try:
        result = True
        return result
    except:
        return False


def get_wfs_vertices_count(url: str, shape=None) -> int:
    """
    Get the number of vertices in the WFS
    """
    try:
        result = 1
        return result
    except:
        return 0

def estimate_size(count: int) -> int:
    """
    Estimate the size of the geojson
    """
    try:
        result = 1
        return result
    except:
        return 0