import os
import shutil

# === CONFIGURATION ===
json_filename = "video_analysis_report.json"
source_dirs = [
    r"E:\image and video deep learning\V3C1-200-20250624T211941Z-1-001\V3C1-200-20250626T215606Z-1-001\V3C1-200",
    r"E:\image and video deep learning\V3C1-200-20250624T211941Z-1-001\V3C1-200-20250626T215606Z-1-002\V3C1-200",
    r"E:\image and video deep learning\V3C1-200-20250624T211941Z-1-001\V3C1-200-20250626T215606Z-1-003\V3C1-200",
    r"E:\image and video deep learning\V3C1-200-20250624T211941Z-1-001\V3C1-200-20250626T215606Z-1-004\V3C1-200",
    r"E:\image and video deep learning\V3C1-200-20250624T211941Z-1-001\V3C1-200-20250626T215606Z-1-005\V3C1-200"
]
destination_dir = r"E:\image and video deep learning\trial_new_project\vbs-video-retrieval-system\Dataset\V3C1-200"

def find_json_for_subfolder(subfolder, source_dirs, json_filename):
    for src_dir in source_dirs:
        candidate = os.path.join(src_dir, subfolder, json_filename)
        if os.path.isfile(candidate):
            return candidate
    return None

def replace_json_in_all_matching_subfolders(source_dirs, destination_dir, json_filename):
    for subfolder in os.listdir(destination_dir):
        dest_path = os.path.join(destination_dir, subfolder)
        if os.path.isdir(dest_path):
            src_json = find_json_for_subfolder(subfolder, source_dirs, json_filename)
            if src_json:
                dest_json = os.path.join(dest_path, json_filename)
                try:
                    shutil.copy2(src_json, dest_json)
                    print(f"Replaced {dest_json} with {src_json}")
                except Exception as e:
                    print(f"Failed to copy to {dest_json}: {e}")
            else:
                print(f"No matching JSON found for {subfolder}, skipping.")

def main():
    replace_json_in_all_matching_subfolders(source_dirs, destination_dir, json_filename)

if __name__ == "__main__":
    main() 