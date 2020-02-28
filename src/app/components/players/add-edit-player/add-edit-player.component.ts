import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.scss']
})
export class AddEditPlayerComponent implements OnInit {

  playerForm: FormGroup;
  serverError: any;
  loading = false;
  returnUrl: any;
  id: any;
  dataPlayer: any;
  constructor(
    public formBuilder: FormBuilder,
    private playerService: PlayerService,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      if(this.id) {
        this.playerService.getPlayerById(this.id)
          .subscribe({
            next:(response : any ) => {
              this.dataPlayer = response.Data;
              this.getForm(this.dataPlayer)
            }
          })
      }
    });
    this.getForm(this.dataPlayer)
  }

  getForm(data) {
    this.playerForm = this.formBuilder.group({
      firstName: [
       data ? data.firstName :  "",
        Validators.compose([Validators.required])
      ],
      lastName: [
        data ? data.lastName :  "",
        Validators.compose([Validators.required])
      ],
      email: [
        data ? data.email :  "",

        Validators.compose([Validators.required])
      ],
      birthDate: [
        data ? data.birthDate :  "",

        Validators.compose([Validators.required])
      ],
      gender: [
        data ? data.gender :  "",

        Validators.compose([Validators.required])
      ],

    });
  }

  saveData()  {
    if (this.playerForm.invalid) {
      this.playerForm.markAllAsTouched();
      return;
    }
    console.log(this.playerForm.value);
    const data  = this.playerForm.value
  this.playerService.AddPlayer(data)
    .subscribe({
      next:(response : any ) =>{
        console.log(response)

      },
      error:(error) => {
        console.log(error)
      },
      complete: ()=> {
        console.log('complete');
        this.router.navigate(['/players']);
      }
    })
  }

}
