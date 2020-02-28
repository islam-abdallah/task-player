import { PlayerService } from './../../core/services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players: any;

  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.getPlayers()
    // this.getTeams()

  }

  getPlayers() {
    this.playerService.getPlayers().subscribe({
      next:(response : any ) => {
        console.log(response)
        this.players = response.Data
      },
      error: (error) => {
        console.log(error)
      },
      complete:() => {
        console.log('complete')
      }
    })
  }
  // getTeams() {
  //   this.playerService.getTeams().subscribe({
  //     next:(response : any ) => {
  //       console.log(response)
  //     },
  //     error: (error) => {
  //       console.log(error)
  //     },
  //     complete:() => {
  //       console.log('complete')
  //     }
  //   })
  // }

}
