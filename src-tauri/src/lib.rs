mod commands;
mod models;
mod services;

use tauri_plugin_dialog;
use commands::filesystem::read_dir_details;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            read_dir_details
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
