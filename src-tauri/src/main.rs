// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use catan_game::frontend_communucation::communucation;

#[tauri::command]
fn get_random_map() -> String{ communucation::get_random_map() }

#[tauri::command]
fn get_housable_points() -> String{ communucation::get_housable_points() }

#[tauri::command]
fn get_bank() -> String{ communucation::get_bank() }

#[tauri::command]
fn get_players() -> String { communucation::get_players() }

#[tauri::command]
fn get_deck() -> String { communucation::get_deck() }

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_random_map, get_housable_points, get_bank, get_players, get_deck])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
