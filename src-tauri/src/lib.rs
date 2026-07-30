mod commands;
mod models;
mod services;

use tauri_plugin_dialog;
use commands::filesystem::read_dir_details;
use commands::filesystem::copy_file;
use commands::filesystem::move_file;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            read_dir_details,
            copy_file,
            move_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
