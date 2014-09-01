'use strict';

angular.module('secsApp')
  .controller('LoginCtrl', ['$location', 'Auth', function($location, Auth) {
    var back = ($location.search() && $location.search().back) || '/';

    this.user = {};
    this.error = '';
    this.submitted = false;

    this.submit = function(form) {
      var _this = this;

      this.submitted = true;
      this.error = '';

      if (form.$valid) {
        Auth.login(this.user)
          .then(function() {
            $location.search('back', null);
            $location.path(back);
          })
          .catch(function(err) {
            console.log(err);
            _this.error = err.data.reason;
            _this.submitted = false;
            form.$setPristine();
          });
      }
    };
  }]);
