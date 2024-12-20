import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMessageSquare, featherPhoneCall, featherVideo, featherMail, featherSearch } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { heroEllipsisVerticalSolid, heroArrowSmallLeftSolid } from '@ng-icons/heroicons/solid';
import { Contact } from '../../../_models/contact.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../_components/spinner/spinner.component';
import { ContactsService } from '../../../_services/contacts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  viewProviders: [provideIcons({ featherMessageSquare,featherPhoneCall,featherVideo,featherMail,
    heroUsers,heroEllipsisVerticalSolid,heroArrowSmallLeftSolid,featherSearch })],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent  implements OnInit {
  selectedContact: Contact = {};
  contactForm: FormGroup;

  loading: boolean = false;
  contactId: string = "";

  get f() {
    return this.contactForm.controls;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _service: ContactsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ){
    this.selectedContact = JSON.parse(sessionStorage.getItem('selectedContact') as string);

    this.contactForm = this.fb.group({
      firstName: ["",[Validators.required]],
      lastName: ["",[Validators.required]],
      phoneNumber: ["",[
        Validators.required,
        Validators.pattern("^[0-9]*$"), Validators.minLength(10),Validators.minLength(10)]],
      email: ["",
        [Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
      ],
      physicalAddress: ["",[Validators.required]],
      groupName: ["",[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.contactForm.patchValue({
      firstName: this.selectedContact.firstName,
      lastName: this.selectedContact.lastName,
      phoneNumber: this.selectedContact.phoneNumber,
      email: this.selectedContact.email,
      physicalAddress: this.selectedContact.physicalAddress,
      groupName: this.selectedContact.groupName
    })

    this.route.params.subscribe((params) => {
      this.contactId = params['id'];
      this._service.getContact(this.contactId).subscribe((res) => {
        this.selectedContact = res
      });
    })
  }

  back(){
    this.router.navigate(['contact-list'])
  }

  edit(){
    this.router.navigate(['edit-contact',this.selectedContact.id])
  }



  updateContact(): void {
    this.loading = true
    setTimeout(() => {
      const payload = this.contactForm.getRawValue();
      const updatedPost = { ...payload };
      this._service.updateContact(this.selectedContact.id, updatedPost).subscribe(() => {
        this.loading = false;
        this.toastr.success(`Contact updated successfully`,'',{positionClass:'toast-top-center',timeOut:1000});
        this.loadContact(this.selectedContact.id as string); // Reload posts after updating
      });
    },1000)
  }

  loadContact(id: string): void {
    this._service.getContact(id).subscribe((res) => {
      this.selectedContact = res
    });
  }
}
