import json
import subprocess


def process_geojson(feature_collection: dict, temp_dir: str):
    input_fname = f"{temp_dir}/tippecanoe_input.json"
    output_fname = f"{temp_dir}/tippecanoe_output.pmtiles"
    try:
        with open(input_fname, "w") as f:
            f.write(json.dumps(feature_collection))
    except Exception as e:
        print(e)
    try:
        subprocess.run(
            [
                "tippecanoe",
                "-zg",
                f"{input_fname}",
                f"--output={output_fname}",
                "--no-tile-compression",
                "--force",
                "--drop-densest-as-needed",
                "--extend-zooms-if-still-dropping",
                "-s EPSG:4326",
            ],
            check=True,
        )
        return output_fname
    except Exception as e:
        print("error creating pm tiles")
        print(e)
        return None
