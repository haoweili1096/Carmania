import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NewsletterService } from '../newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  newsletterForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]]
  });
  disabledButton = false; // prevent users from clicking on Subscribe button many times before component receiving result form db
  formSuccess = false;
  formError = {
    show: false,
    message: ''
  };

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService
  ) { }

  submitForm() {
    this.disabledButton = true;
    if(this.newsletterForm.valid) {
      this.newsletterService.subscribeUser(this.newsletterForm.value.email).subscribe(
        data => {
          console.log(this.newsletterForm);
          this.formSuccess = true;
          this.newsletterForm.reset();
          this.enableButton();
        },
        error => {
          this.handleError('show', error);
        }
      );
    }
    else{
      // handle errors
      this.handleError('show', 'The email is not valid!');
    }
  }

  handleError(type: string, message: string) {
    if(type === 'reset') {
      this.formError = {
        show: false,
        message
      }
    }
    else{
      this.formError = {
        show: true,
        message
      };
    }
    this.enableButton();
  }

  enableButton() {
    setTimeout(() => {
      this.disabledButton = false;
    }, 2000); 
  }

  ngOnInit() {
  }

}
