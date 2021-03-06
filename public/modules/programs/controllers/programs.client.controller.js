'use strict';

// Programs controller

// <<<<<<< HEAD
angular.module('programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Programs', 'ProgramsComment', 'Comments', 'ProgramsLike', 'Likes', 'RSVP',
    function($scope, $stateParams, $location, Authentication, Programs, ProgramsComment, Comments, ProgramsLike, Likes, RSVP) {
        $scope.authentication = Authentication;
        var geocoder;
        $scope.makeComment = false;

        $scope.doRSVP = function(id){
            RSVP.schedule({programId: id}, function(res){
                console.log(res);
            },function(res){
                console.log(res);
            });
        }


        $scope.checkUserLocation = function() {
            console.log('running check user');
            geocoder = new google.maps.Geocoder();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
// =======
// angular.module('programs').controller('ProgramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Programs', 'ProgramsComment', 'Comments', 'ProgramsLike', 'Likes',
//     function($scope, $stateParams, $location, Authentication, Programs, ProgramsComment, Comments, ProgramsLike, Likes) {
//         $scope.authentication = Authentication;
//         var geocoder;
//         $scope.makeComment = false;

//         $scope.checkUserLocation = function() {
//             console.log('running check user');
//             geocoder = new google.maps.Geocoder();
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(function(position) {
//                     var lat = position.coords.latitude;
//                     var lng = position.coords.longitude;
// >>>>>>> 877b1f24ede03516e387f638a677e654e23c1161

                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({

                        'latLng': latlng
                    }, function(results, status) {
           
                        if (status === google.maps.GeocoderStatus.OK) {
                   
                            if (results[1]) {
                           
                                $scope.loadEventsInLocation(results[1].formatted_address);
                            } else {
                                alert('No results found');
                            }
                        } else {
                            alert('Geocoder failed due to: ' + status);
                        }
                    });

                });
            } else {
                alert('Geo Location is not supported');
            }
        };



        $scope.loadEventsInLocation = function(userLocation) {
            var myRe = new RegExp(userLocation.split(',', 1));
            $scope.nearEvents = [];
            $scope.programPromise = Programs.query().$promise.then(function(response) {
                $scope.programs = response;
            });
            for (var i in $scope.programs) {
                if (myRe.test($scope.programs[i].location)) {
                    $scope.nearEvents.push($scope.programs[i]);
                }
            }
            console.log($scope.nearEvents);
        };
        //Autocomplete
        $scope.location = '';
        $scope.options2 = {
            country: 'ng'
        };
        $scope.details2 = '';

        //Date picker
        $scope.today = function() {
            $scope.dt = new Date();
            var curr_date = $scope.dt.getDate();
            var curr_month = $scope.dt.getMonth();
            var curr_year = $scope.dt.getFullYear();
            $scope.dt = curr_year + curr_month + curr_date;
        };
        $scope.today();
        $scope.clear = function() {
            $scope.dt = null;
        };
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.stringFiles = [];

        //Image Upload
        $scope.onFileSelect = function($file) {
            $scope.select = $file;
            if ($scope.select[0].type === 'image/gif' || $scope.select[0].type === 'image/png' || $scope.select[0].type === 'image/jpg' || $scope.select[0].type === 'image/jpeg') {

                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.stringFiles.push({
                        path: e.target.result
                    });
                };
                console.log($scope.stringFiles);
                reader.readAsDataURL($scope.select[0]);

            }
        };

        // Create new Program
        $scope.create = function() {
            // Create new Program object
            var program = new Programs({
                name: this.name,
                category: this.category,
                location: this.location,
                description: this.description,
                programTime: this.programTime,
                programDate: this.programDate
            });
             program.image = $scope.stringFiles;
            // Redirect after save
            program.$save(function(response) {
                $location.path('programs/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.location = '';
                $scope.description = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Program
        $scope.remove = function(program) {
            if (program) {
                program.$remove();

                for (var i in $scope.programs) {
                    if ($scope.programs[i] === program) {
                        $scope.programs.splice(i, 1);
                    }
                }
            } else {
                $scope.program.$remove(function() {
                    $location.path('programs');
                });
            }
        };

        // Update existing Program
        $scope.update = function() {
            var program = $scope.program;

            program.$update(function() {
                $location.path('programs/' + program._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        // Find a list of Programs
        $scope.find = function() {
            $scope.programs = Programs.query();
            $scope.checkUserLocation();
        };

        // Find existing Program
        function fixDate(i) {
                i = i.toString();
                return i.length === 1 ? '0' + i : i;
            }
            //Find existing Program
        $scope.findOne = function() {
            $scope.programContent = Programs.get({
                programId: $stateParams.programId
            }, function(response) {
                $scope.qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=';
                // Setting Map Position
                try {
                    geocoder = new google.maps.Geocoder();
                    var options = {
                        zoom: 17
                    };
                    var map = new google.maps.Map(document.getElementById('map_canvas'), options);
                    var sAddress = $scope.programContent.program.location;
                    geocoder.geocode({
                        'address': sAddress
                    }, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            $scope.marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                animation: google.maps.Animation.BOUNCE
                            });
                            map.setCenter(results[0].geometry.location);
                        }
                    });
                } catch (e0) {

                }
                $scope.program = $scope.programContent.program;
                //Formating Date
                var cdate = new Date($scope.program.programDate);
                cdate = cdate.getFullYear() + '-' + fixDate(cdate.getMonth() + 1) + '-' + fixDate(cdate.getDate());
                //Setting QR Code
                var qrData = encodeURIComponent('Title: ' + $scope.program.name + '\nDescription: ' + $scope.program.description + '\nDate: ' + cdate + '\nLocation: ' + $scope.program.location);
                $scope.qrcodeUrl = $scope.qrcodeUrl + qrData;
                delete $scope.programContent.program;
                delete $scope.programContent.userlike;

                for (var i in $scope.programContent) {
                    $scope.program[i] = $scope.programContent[i];
                }
                //Check if user has liked Event before
                $scope.hasLiked = $scope.programContent.userlike ? true : false;
            });
            //Get Program Comments
            $scope.comments = ProgramsComment.query({
                programId: $stateParams.programId
            });
        };
        $scope.addComments = function() {
            // Create new Comment object
            var comment = new ProgramsComment({
                comment: $scope.newComment
            });
            //Redirect after save
            comment.$save({
                programId: $stateParams.programId
            }, function(response) {
                $scope.findOne();
                $scope.newComment = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.openCommentForm = function() {
            $scope.makeComment = !$scope.makeComment;
        };
        $scope.doLike = function() {
            // Create new Like object
            var likeObject = {
                like: true
            };
            var like = new ProgramsLike(likeObject);
            //Redirect after save
            like.$save({
                programId: $stateParams.programId
            }, function(response) {
                $scope.hasLiked = response;
                if (response) {
                    if (response.like) {
                        $scope.program.likes.push(response._id);
                    } else {
                        var i = $scope.program.likes.indexOf(response._id);
                        if (i > -1) {
                            $scope.program.likes.splice(i, 1);
                            $scope.hasLiked = false;
                        }
                    }
                }
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);
