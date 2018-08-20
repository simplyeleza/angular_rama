/// <reference path="../_all.ts" />

module ContactManagerApp {

  export class AddUserDialogController {
    static $inject = ['$mdDialog'];
    
    constructor(private $mdDialog) {}
    
    cancel(): void {
      this.$mdDialog.cancel();
    }
    
    save(): void {
      this.$mdDialog.hide(new User("placeholder", "", "", []));
    }
  }
}