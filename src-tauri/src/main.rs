// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn get_random_map() -> String{
    catan_game::frontend_communucation::send_info::get_random_map()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_random_map])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

