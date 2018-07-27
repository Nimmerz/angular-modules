import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {reject} from "q";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // @ViewChild('form') form: NgForm;
  //
  //
  // defaultAnswer = 'no';
  // defaultCountry = 'ua';
  // formData = {};
  // isSubmitted = false;

  answers = [{
    type: 'yes',
    text: 'Да'
  }, {
    type: 'no',
    text: 'Нет'
  }];

  form: FormGroup;
  charsCount = 5;


  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.checkForEmail),
        password: new FormControl('', [Validators.required, this.checkForLength.bind(this)]),
      }),
      country: new FormControl('ua'),
      answer: new FormControl('no')
    });
  }

  // submitForm() {
  //   this.isSubmitted = true;
  //   console.log('add form', this.form);
  //   this.formData = this.form.value;
  //   this.form.reset();
  // }
  //
  //
  // addRandEmail() {
  //   const randEmail = 'btn@gm.com';
  //   // this.form.setValue({
  //   //   user: {
  //   //     password: '',
  //   //     email: randEmail
  //   //   },
  //   //   country: '',
  //   //   answer: ''
  //   // });
  //   this.form.form.patchValue({
  //     user: {email: randEmail}
  //   })
  // }


  onSubmit() {
    console.log('Submit', this.form);
  }


  checkForLength(control: FormControl) {
    if (control.value.length <= this.charsCount) {
      return {
        'lengthError': true
      }
    }
    return null
  }

  checkForEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@mail.ru') {
          resolve({
            'emailIsUsed': true
          });
        } else {
          resolve(null)
        }
      }, 3000)
    })
  }

}
