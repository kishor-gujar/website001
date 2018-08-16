        $(document).ready(function() {
        $('#slideContainer').jSlideshow();
        });
		
		(function($){

  var methods = {
    
    a : null,
    dataObj : null,
    
    //
    // init
    // Initilises the namespace and sets up the slideshow
    //
    init : function(config) {

      // Assign instance var with the initial object
      methods.a = $(this);
      var $this = methods.a;
      
      // Update instance var with data property
      methods.dataObj = $this.data('jSlideshow');

      // Plugin hasn't been initialised yet
      if (!methods.dataObj) {

        $this.data('jSlideshow', {
          target : $this,
          config : config,                     // Store config object for use by other methods
          currentPosition : 0,                 // Used to store current position of slideshoq
          numberOfSlides : $('.slide').length, // Calculate the total number of slides
          timeoutID : null                     // To store timeout identifier
        });

        // Update local variable with data property
        methods.dataObj = $this.data('jSlideshow');

      }
      
      // Declare local copy for use in the init method
      var data = methods.dataObj;

      // Remove scrollbar in JS
      $this.css('overflow', 'hidden');

      // Wrap all slieds in a container
      $('.slide').wrapAll('<div id="slideInner"></div>').css({'float' : 'left', 'width' : data.config.slideWidth});

      $('#slideInner').css('width', data.config.slideWidth * data.numberOfSlides);

      // Add "Left" arrow to controls
      $('#slideContainer').prepend('<span class="control" id="leftControl">Left</span>');

      // Only add play/pause icons if auto slide is enabled
      if(data.config.enableAuto) {
        var tmpLeft = Math.floor((data.config.slideWidth / 2) - 13.5);
        $('#slideContainer').prepend('<span class="control" id="pauseControl">Pause</span>');
        $('#slideContainer #pauseControl');
        $('#slideContainer').prepend('<span class="control" id="playControl">Play</span>');
        $('#slideContainer #playControl');
      }

      // Add "Right" arrow to controls
      $('#slideContainer').append('<span class="control" id="rightControl">Right</span>');

      // Hide left arrow control on first load
      methods.manageControls();

      // Create event listeners for each .control click
      $('.control').bind('click', methods.controlEvent);
      
      methods.play();

     },

    controlEvent : function() {

       var $this = methods.a,
           data = methods.dataObj;

       switch($(this).attr('id')) {

         case 'rightControl' :
           data.currentPosition++;
           $("#pauseControl").hide();
           $("#playControl").show();
           methods.pause();
           break;

         case 'leftControl' :
           data.currentPosition--;
           $("#pauseControl").hide();
           $("#playControl").show();
           methods.pause();
           break;

         case 'pauseControl' :
           $("#playControl").toggle();
           $("#pauseControl").toggle();
           methods.pause();
           break;

         case 'playControl' :
           $("#playControl").toggle();
           $("#pauseControl").toggle();
           methods.play();
           break;
         
       }

       // Sort out controls before displaying slide
       methods.manageControls();

       // Slide to next image
       $('#slideInner').animate({'marginLeft' : data.config.slideWidth*(-data.currentPosition)});
       
     },

     //
     // manageControls
     // Hides and shows controls depending on currentPosition
     //
     manageControls : function() {

      var $this = methods.a,
          data = methods.dataObj;

      // Hide left arrow if position is first slide
      if(data.currentPosition == 0) {
        $('#leftControl').hide();
      } else {
        $('#leftControl').show();
      }

      // Hide right arrow if position is last slide
      if(data.currentPosition == data.numberOfSlides-1) {
        $('#rightControl').hide();
      } else {
        $('#rightControl').show();
      }      

    },

    //
    // updateSlides
    // Moves to the next image. If at the end, go the the beginning
    //
    updateSlides : function() {
    
      var $this = methods.a,
          data = methods.dataObj;

      // At end of slides? Go back to the start
      if(data.currentPosition == data.numberOfSlides-1)
      {
        data.currentPosition = 0;
      } else {
        data.currentPosition++;
      }

      // Update the controls
      methods.manageControls();

      // Move to the next image
      $('#slideInner').animate({'marginLeft' : data.config.slideWidth*(-data.currentPosition)});

    },

    //
    // start
    // Start to play the slideshow
    //
    play : function() {
    
      var $this = methods.a,
          data = methods.dataObj;

      // Only set interval if auto slide has been enabled
      if(data.config.enableAuto) {
        data.timeoutID = setInterval(methods.updateSlides, data.config.timeout*1000);
      }
  
    },

    //
    // stop
    // Stops the slideshow
    //
    pause : function()
    {
    
      var $this = methods.a,
          data = methods.dataObj;
    
      // Only set interval if auto slide has been enabled
      if(data.config.enableAuto) {
        clearInterval(data.timeoutID);
      }
  
    }

  };

  //
  // Extend jquery to include the plugin
  //
  $.fn.jSlideshow = function(options) {

    var config = {
      slideWidth: 330,      // Width of each invidiaul slide in pixles
      enableAuto: true,     // enables/disables the auto slideshow
      timeout: 5            // Timeout period in seconds for transitions
    }

    // Merge user defined options with global config
    if(options) {
      $.extend(config, options);
    }

    // Call init method
    return methods.init.apply(this, $.makeArray(config));

  };

})(jQuery);