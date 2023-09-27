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

#[tauri::command]
fn get_current_player() -> String { communucation::get_current_player() }

#[tauri::command]
fn get_roads() -> String { communucation::get_roads() }

#[tauri::command]
fn make_house(x: usize, y: usize) { 
    communucation::make_house(x,y); 
}

#[tauri::command]
fn end_turn() {
    communucation::next_turn();
    println!("geliyor");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_random_map, get_housable_points, get_bank, get_players, get_deck, get_current_player, get_roads, make_house, end_turn])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
