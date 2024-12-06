import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { VoterService } from 'src/app/voter.service';

@Component({
  selector: 'app-addparty',
  templateUrl: './addparty.component.html',
  styleUrls: ['./addparty.component.css']
})
export class AddpartyComponent {
  errorMessage: string = '';
  partyName: string = '';
  partyLogo: string = '';
  partyLeaderName: string = '';
  constituency: string='';
  canImage: string ='';
  partyId: any = '';
  isEdit: boolean = false;
  constructor(
    private service: VoterService,
    private activateRouter: ActivatedRoute
  ) {
    activateRouter.queryParams.subscribe((res: any) => {
      if (res?.partyId) {
        console.log('>>>>>>', res?.partyId);
        this.isEdit = true;
        this.getPartyData(res?.partyId);
      } else {
        this.isEdit = false;
      }
    });
  }

  getPartyData(pId: any) {
    this.service.getPartyById(pId).subscribe((res: any) => {
      console.log('>>>>>>>GG>>>', res);
      if (res && res?.partyId) {
        this.partyLeaderName = res?.partyLeaderName;
        this.partyId = res?.partyId;
        this.partyLogo = res?.partyLogo;
        this.partyName = res?.partyName;
        this.constituency = res?.constituency;
        this.canImage = res?.canImage
      }
    });
  }

  addParty(): any {

    if (this.partyName === '') {
      this.errorMessage = 'Party name should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    const partyPartten = (/[A-Za-z]+$/)
      if (!partyPartten.test(this.partyName)) {
        this.errorMessage = 'Party Name Can not be Number';
        document.getElementById('errordiv')?.scrollIntoView(true);
        return;
      }
    if (this.partyLogo === '') {
      this.errorMessage = 'Party Logo should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.partyLeaderName === '') {
      this.errorMessage = 'Leader Name should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (!partyPartten.test(this.partyLeaderName)) {
      this.errorMessage = 'Party leader name can not be Number';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.constituency === '') {
      this.errorMessage = 'Constituency Name should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (!partyPartten.test(this.constituency)) {
      this.errorMessage = 'Constituency can not be Number';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.canImage === '') {
      this.errorMessage = 'Candidate Image should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    
    const body: any = {
      partyName: this.partyName,
      partyLogo: this.partyLogo,
      partyLeaderName: this.partyLeaderName,
      constituency: this.constituency,
      canImage: this.canImage,
      votes: 0
    };

    this.service.addParty(body).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>>>>>>>>>>', res);
      console.log('$$$$$$$$$$', body);
      
      if (res && res === 'Party added successfully') {
        alert('Party Added successfully');
        this.service.navigateToLink('adminlistparty');
      }
    });
  }

  updateParty(): void {
    console.log('UPDTE');
    const body: any = {
      partyName: this.partyName,
      partyLogo: this.partyLogo,
      partyLeaderName: this.partyLeaderName,
      partyId: this.partyId
    };
    this.service.updateParty(body).subscribe((res: any) => {
      if (res && res?.partyId) {
        alert("Party Updated successfully");
        this.service.navigateToLink('adminlistparty');
      }
    });
  }

}
