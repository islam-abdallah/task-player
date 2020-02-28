import { SharedModule } from './../../core/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { AddEditPlayerComponent } from './add-edit-player/add-edit-player.component';
import { DeletePlayerPopupComponent } from './delete-player-popup/delete-player-popup.component';
import { RouterModule } from '@angular/router';
const router = [
  { path: "", component: PlayersComponent },
  { path: "add", component: AddEditPlayerComponent },
  { path: "edit/:id", component: AddEditPlayerComponent },
];

@NgModule({
  declarations: [PlayersComponent, AddEditPlayerComponent, DeletePlayerPopupComponent],
  imports: [
    CommonModule, RouterModule.forChild(router), SharedModule
  ]
})
export class PlayersModule { }
