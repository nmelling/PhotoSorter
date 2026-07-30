use crate::models::file_info::FileInfo;
use crate::services::filesystem;

#[tauri::command]
pub fn read_dir_details(path: String) -> Result<Vec<FileInfo>, String> {
    filesystem::read_directory(&path)
}

#[tauri::command]
pub fn copy_file(filepath: String, targetpath: String) -> Result<(), String> {
    filesystem::copy_file(&filepath, &targetpath)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn move_file(filepath: String, targetpath: String) -> Result<(), String> {
    filesystem::move_file(&filepath, &targetpath)
        .map_err(|e| e.to_string())
}
