var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
        this.targetCollectionResource = new AR.TargetCollectionResource("assets/product.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
        });




		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/

		/* Create overlay for page one */
		var imgOne = new AR.ImageResource("assets/microsoft-xbox-one.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			translate: {
				x:-0.15
			}

		});


		this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");


        var pageOneButton = this.createWwwButton("https://rewarddollars.americanexpress.com/RewardDetail?id=187088&from=ELEC01", 0.1, {
        			translate: {
        				x: 0.30,
        				y: -0.25
        			},
        			zOrder: 1
        		});




		var pageOne = new AR.ImageTrackable(this.tracker,"xbox", {
        			drawables: {
        				cam: [overlayOne, pageOneButton]
        			},
        			onImageRecognized: this.removeLoadingBar,
                    onError: function(errorMessage) {
                    	alert(errorMessage);
                    }
        		});


        var imgTwo = new AR.ImageResource("assets/shree1.png");
                var overlayTwo = new AR.ImageDrawable(imgTwo, 0.5, {
                    translate: {
                        x: 0.12,
                        y: -0.01
                    }
                });

        var pageTwoButton = this.createWwwButton("https://rewarddollars.americanexpress.com/RewardDetail?id=161064&from=ELEC01", 0.15, {
            translate: {
                y: -0.25
            },
            zOrder: 1
        });


        var pageTwo = new AR.ImageTrackable(this.tracker,"head", {
            drawables: {
                cam: [overlayTwo,pageTwoButton]
            },
            onImageRecognized: this.removeLoadingBar,
            onError: function(errorMessage) {
                alert(errorMessage);
            }
        });

	},

	createWwwButton: function createWwwButtonFn(url, size, options) {
    		/*
    			As the button should be clickable the onClick trigger is defined in the options passed to the AR.ImageDrawable. In general each drawable can be made clickable by defining its onClick trigger. The function assigned to the click trigger calls AR.context.openInBrowser with the specified URL, which opens the URL in the browser.
    		*/
    		options.onClick = function() {
    			AR.context.openInBrowser(url);
    		};
    		return new AR.ImageDrawable(this.imgButton, size, options);
    	},






	removeLoadingBar: function() {
		if (!World.loaded) {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
			World.loaded = true;
		}
	},

	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivLeft + ">Scan the  Product and find out the dollar equivalent Membership points </div>" +
			"<div" + cssDivRight + "><img src='assets/sm4.jpg'></img></div>";
	}
};

World.init();
