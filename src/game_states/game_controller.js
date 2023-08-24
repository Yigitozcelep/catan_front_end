
class Player {
    constructor () {
     this.tot = 0;
     this.lumber = 0;
     this.grain = 0;
     this.ore = 0;
     this.brick = 0;
     this.wool = 0;
     this.max_road = 0;
     this.max_army = 0;
     this.dev_army = 0;
     this.dev_road = 0;
     this.dev_monopoly = 0;
     this.dev_2_resources = 0;
     this.dev_victory = 0;
    } 
 }
 
 // TODO CONSTRUCTERA MAP EKLİCEN
 class Game_State {
     constructor () {
         this.players = [new Player(), new Player(), new Player(), new Player()];
         this.map = []
 
     }
 }
 
 export default Game_State;
 