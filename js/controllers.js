app.controller('DynamicFormController', ['$scope', '$http', function ($scope, $http) {


    // Template JSON Data
    $scope.templateJSON = [
        {
            "TemplateName": "JPEM_20170098",
            "CreatedDate": "Mon 12 Jul 2018",
            "UpdatedDate": "Wed 18 Jul 2018",
            "Status": "Active"
        },
        {
            "TemplateName": "JPEM_20170075",
            "CreatedDate": "Tue 13 Jul 2018",
            "UpdatedDate": "Mon 16 Jul 2018",
            "Status": "Inactive"
        },
        {
            "TemplateName": "PeerJ-Binomial",
            "CreatedDate": "Mon 12 Jul 2018",
            "UpdatedDate": "Wed 18 Jul 2018",
            "Status": "Active"
        },
        {
            "TemplateName": "JPEM_20170078",
            "CreatedDate": "Tue 13 Jul 2018",
            "UpdatedDate": "Mon 16 Jul 2018",
            "Status": "Inactive"
        },
        {
            "TemplateName": "JPEM_20170025",
            "CreatedDate": "Mon 12 Jul 2018",
            "UpdatedDate": "Wed 18 Jul 2018",
            "Status": "Active"
        },
        {
            "TemplateName": "PeerJ_075",
            "CreatedDate": "Tue 13 Jul 2018",
            "UpdatedDate": "Mon 16 Jul 2018",
            "Status": "Inactive"
        }
    ];

    // Clone
    $scope.cloneThis = function (e) {
        var currentDiv = angular.element(e.target).parent("td").parent("tr");
        var myClone = currentDiv.clone(true);

        currentDiv.after(myClone);
        console.log("Even Cloe");
    };

    // Template controller
    $scope.tempNames = [
        'JPEM_20170188',
        'JPEM_20170398',
        'JPEM_ND2ND',
        'PeerJ_075',
        'PeerJ_4794_V1',
        'JPEM_20170075',
        'PeerJ-Binomial',
        'JPEM_Ref2_V2',
        'JPEM_507'
    ];

    $http.get('JPEM_list_conversion.json').then(function (response) {
        var temp;
        // temp = angular.fromJson(response.data.Punctuation[0].Authors[0].AuthorForename); 
        $scope.punclist = angular.fromJson(response.data.Punctuation[0]); 
        console.log(temp);

        //Declarations
        $scope.select = response.data;
        $scope.puncvalue = '';
        $scope.firstkey = [];

        $scope.thirdkey = [];
        $scope.puncvalue = 'Punctuation';

        // Getting Punctuation Data Value
        $scope.myData = $scope.select[$scope.puncvalue];

        // Loading First Level of List Data - Authors/Journals Menu
        angular.forEach($scope.myData[0], function (value, fkey) {
            $scope.firstkey.push(fkey) ;
            $scope.fkey = fkey
        });
        // $scope.fkeyinit = function(){
        //     $scope.fkey = $scope.myData[0];
        //     console.log(fkey);
        //     // Second Value fkey Function Loads when user changing select box - Author / Journal Select box
        //     angular.forEach($scope.myData[0][fkey][0], function (nvalue, key) {
        //         $scope.secondkey = [];
        //         console.log($scope.myData[0][fkey][0]);
        //         $scope.secondkey.push(key) ;
        //     });
        // }

        $scope.secondval = function (fkey) {
            $scope.fkeyname = fkey;
            $scope.secondkey = [];
            
            // console.log($scope.myData[0][fkey]);
            angular.forEach($scope.myData[0][fkey][0], function (nvalue, key) {
                if (angular.isArray(nvalue) || angular.isObject(nvalue)) {
                    $scope.secondkey.push(key) ;
                    
                    var seconfinalvar = $scope.secfinal = $scope.myData[0][fkey][0];
                    angular.forEach($scope.myData[0][fkey][0][key][0], function (nvalue, tkey) {
                        $scope.thirdkey = [];
                        if (angular.isArray(nvalue) || angular.isObject(nvalue)) {
                            $scope.thirdkey.push(tkey) ;
                            console.log('key',$scope.secondkey);
                            console.log('tkey',tkey);
                       } else {
                            $scope.formvalues = [];

                            angular.forEach(seconfinalvar[key], function (value, key) {
                                $scope.formvalues.push({ formkey: key, formvalue: value });
                                  console.log('else',key, value);
                            });
                        }
                    });
                    // console.log('skey',$scope.secondkey);
                    // console.log('tkey',$scope.thirdkey);
                } else {
                    $scope.formvalues = [];
                    angular.forEach($scope.myData[0][fkey][0], function (value, key) {
                        $scope.formvalues.push({ formkey: key, formvalue: value });
                    });
                }
            });
            $scope.secfinal = $scope.myData[0][fkey][0];
            console.log('skey',$scope.secondkey);
            console.log('tkey',$scope.thirdkey);

        }
        // Loading Third Level of List Data
        $scope.thirdval = function (skey) {

            //Active Selected
            $scope.selectedskey = skey;
            $scope.isSelectedskey = function (skey) {
                return $scope.selectedskey === skey;
            }


            $scope.thirdkey = [];
            var seconfinalvar = $scope.secfinal;
            var sec = $scope.myData[0][skey];

            angular.forEach(seconfinalvar[skey][0], function (nvalue, key) {
                if (angular.isArray(nvalue) || angular.isObject(nvalue)) {
                    $scope.thirdkey.push(key) ;

                } else {
                    $scope.formvalues = [];

                    angular.forEach(seconfinalvar[skey][0], function (value, key) {
                        $scope.formvalues.push({ formkey: key, formvalue: value });
                        console.log(key, value);
                    });
                }
            });
            $scope.thirdfinal = seconfinalvar[skey][0];
            $scope.isArray = angular.isArray;
            // console.log( $scope.thirdkey);
        }

        $scope.LoadForm = function (tkey) {

            //Active Selected
            $scope.selectedtkey = tkey;
            $scope.isSelectedtkey = function (tkey) {
                return $scope.selectedtkey === tkey;
            }

            $scope.formvalues = [];
            var thirdfinalvar = $scope.thirdfinal;

            angular.forEach(thirdfinalvar[tkey][0], function (value, key) {
                $scope.formvalues.push({ formkey: key, formvalue: value });
            });
        }
    })
}])


app.controller('Basic', ['$scope', '$element', 'dragularService', function TodoCtrl($scope, $element, dragularService) {
    dragularService('.containerVertical');
}])

app.controller('myCtrl', function ($scope, $http) {

    $scope.Register = function (register) {
        console.log(register);
        $http.post(register, {})
            .success(function (response) {
                $scope.usersData = response.users;
            });
    };
});

(function () {

    app.controller("WizardController", [wizardController]);

    function wizardController() {
        var vm = this;

        //Model
        vm.currentStep = 1;
        vm.steps = [
            {
                step: 1,
                name: "Template",
                subdesc: "Choose Template Pattern",
                template: "step1.html"
            },
            {
                step: 2,
                name: "Form Details",
                subdesc: "Fill Form Details",
                template: "step2.html"
            },
            {
                step: 3,
                name: "Submit",
                subdesc: "Preview and Submit ",
                template: "step3.html"
            },
        ];
        vm.user = {};

        //Functions
        vm.gotoStep = function (newStep) {
            vm.currentStep = newStep;
        }

        vm.getStepTemplate = function () {
            for (var i = 0; i < vm.steps.length; i++) {
                if (vm.currentStep == vm.steps[i].step) {
                    return vm.steps[i].template;
                }
            }
        }

        vm.save = function () {
            alert(
                "Saving form... \n\n" +
                "Name: " + vm.user.name + "\n" +
                "Email: " + vm.user.email + "\n" +
                "Age: " + vm.user.age);
        }
    }

})();


