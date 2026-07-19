use crate::models::file_info::FileInfo;

use mime_guess::from_path;
use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

pub fn read_directory(path: &str) -> Result<Vec<FileInfo>, String> {
    let mut files = Vec::new();

    let entries = fs::read_dir(path).map_err(|e| e.to_string())?;

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;

        let metadata = entry.metadata().map_err(|e| e.to_string())?;

        let path = entry.path();

        let extension = path
            .extension()
            .and_then(|e| e.to_str())
            .map(String::from);

        let mime_type = from_path(&path)
            .first_or_octet_stream()
            .essence_str()
            .to_string();

        files.push(FileInfo {
            name: entry.file_name().to_string_lossy().to_string(),
            path: path.to_string_lossy().to_string(),
            extension,
            mime_type,
            size: metadata.len(),

            created_at: metadata.created().ok().and_then(system_time_to_unix),
            modified_at: metadata.modified().ok().and_then(system_time_to_unix),

            is_dir: metadata.is_dir(),
            is_file: metadata.is_file(),
            is_symlink: metadata.is_symlink(),
        });
    }

    Ok(files)
}

fn system_time_to_unix(time: SystemTime) -> Option<u64> {
    time.duration_since(UNIX_EPOCH)
        .ok()
        .map(|duration| duration.as_millis() as u64)
}
