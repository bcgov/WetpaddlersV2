import json
import subprocess


def process_geojson(feature_collection: dict, temp_dir: str):
    try:
        with open(f"{temp_dir}/tippecanoe_input.json", "w") as f:
            f.write(json.dumps(feature_collection))
    except Exception as e:
        print(e)
    try:
        subprocess.run(
            [
                "tippecanoe",
                "-zg",
                f"{temp_dir}/tippecanoe_input.json",
                f"--output={temp_dir}/tippecanoe_output.mbtiles",
                "--no-tile-compression",
                "--force",
            ],
            check=True,
        )
        subprocess.run(
            [
                "pmtiles",
                "convert",
                f"{temp_dir}/tippecanoe_output.mbtiles",
                f"{temp_dir}/tippecanoe_output.pmtiles",
            ],
            check=True,
        )
        return f"{temp_dir}/tippecanoe_output.pmtiles"
    except Exception as e:
        print("error creating pm tiles")
        print(e)
        return None
