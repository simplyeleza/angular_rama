/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var MainController = /** @class */ (function () {
        function MainController(userService) {
            this.userService = userService;
            this.users = [];
            this.message = "Hello From our controller";
            var self = this;
            this.userService
                .loadAllUsers()
                .then(function (users) {
                self.users = users;
                console.log(self.users);
            });
        }
        MainController.$inject = ['userService'];
        return MainController;
    }());
    ContactManagerApp.MainController = MainController;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=mainController.js.map