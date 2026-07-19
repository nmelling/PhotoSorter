use serde::Serialize;
use ts_rs::TS;

#[derive(Serialize, TS)]
#[ts(export)]
pub struct FileInfo {
    pub name: String,
    pub path: String,
    pub extension: Option<String>,
    pub mime_type: String,
    pub size: u64,
    pub created_at: Option<u64>,
    pub modified_at: Option<u64>,
    pub is_dir: bool,
    pub is_file: bool,
    pub is_symlink: bool,
}
