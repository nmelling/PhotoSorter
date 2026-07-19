use crate::models::file_info::FileInfo;
use crate::services::filesystem;

#[tauri::command]
pub fn read_dir_details(path: String) -> Result<Vec<FileInfo>, String> {
    filesystem::read_directory(&path)
}
