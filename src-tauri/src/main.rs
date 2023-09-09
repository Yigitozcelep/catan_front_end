// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use catan_game::frontend_communucation::communucation;

#[tauri::command]
fn get_random_map() -> String{ communucation::get_random_map() }

#[tauri::command]
fn get_housable_points() -> String{communucation::get_housable_points()}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_random_map, get_housable_points])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}