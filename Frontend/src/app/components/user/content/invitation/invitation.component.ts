import { Component, OnInit } from '@angular/core';

import { GroupService } from '../../../../services/group/group.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  content: boolean;

  constructor(
  	private userService: UserService,
  	private groupService: GroupService
  ) { }
  
  ngOnInit() {
    this.groupService.tempAllMember = [];
    this.getAllTempMembers();
  }

  getAllTempMembers() {
    this.groupService.getAllTempMember(this.userService.user._id).subscribe(
      (model) => {
        this.groupService.tempAllMember = model;
        if(this.groupService.tempAllMember.length == 0)
          this.content = false;
        else
          this.content = true;
      },
      (err) => {
        console.log(err);
      }
    );    
  }

  getProfile() {
    this.userService.getProfile().subscribe(
      (model) => {
        this.userService.setUser(model);
        if(this.userService.user.group.length == 1) this.groupService.active = this.userService.user.group[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAccept(model) {
    this.groupService.postCreateMemberResponse(model, true).subscribe(
      (message) => {
        console.log(message);     
        this.getAllTempMembers();        
        this.getProfile();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onReject(model) {
    this.groupService.postCreateGroupResponse(model, false).subscribe(
      (message) => {
        console.log(message);     
        this.getAllTempMembers();      
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
