class ValidationForm {
  constructor(teste, errorsCreated, messageErrors) {
    this.teste = teste;
    this.form = document.querySelector('form');
    this.fields = document.querySelectorAll('[required]');
    this.messageErrors =  {
      valueMissing: (field) => 'Este Campo e obrigatorio',
      tooShort: (field) => `Esse Campo precisa de no minimo ${field.minLength} caracteres`,
      typeMismatch: (field) => `Esse Email é invalido`,
      rangeOverflow: (field) => `O valor desse campo é de no maximo ${field.max}`,
      rangeUnderflow: (field) => `O valor desse campo é no minimo ${field.min}`
    };

    this.messageErrors = messageErrors ? {...this.messageErrors, ...messageErrors} : this.messageErrors;

    this.errorsCreated = errorsCreated || {};

    this.verifyError = this.verifyError.bind(this);
    this.init();
  }

  init() {
    if (this.teste) {
      this.form.addEventListener('submit', e => {
        console.log('Formulario enviado');
        e.preventDefault();
      })
    }
    this.fields.forEach(field => {
      field.addEventListener('invalid', this.verifyError)
      field.addEventListener('blur', this.verifyError);
    })
  }

  verifyError(e) {
    e.preventDefault();
    this.field = e.target;
    this.createMyErrors();
    this.err = false;
     for (const error in this.field.validity) {
       if (error !== 'customError' && error !== 'valid' && this.field.validity[error]) {
         this.err = error;
       }
     }
    this.spanError();
  }

  spanError() {
    const span = this.field.parentNode.querySelector('span');
    if (this.teste) console.log(this.err);
    const messageError = this.messageErrors[this.err]? this.messageErrors[this.err](this.field):false;
    if (messageError) {
      span.classList.add('active');
      span.innerHTML = messageError;
    } else {
      span.classList.remove('active');
      span.innerHTML = '';
    }
  }


  createMyErrors() {
    if (!this.errorsCreated) return;
    for (const error in this.errorsCreated) {
      this.field.validity[error] = this.errorsCreated[error]? this.errorsCreated[error](this.field): false;
    }
  }
}
