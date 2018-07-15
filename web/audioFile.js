// Wrap everything in a function to keep your stuff private.
(function () {

    // JavaScript strict mode is a good thing.
    "use strict";

    // Define a unique global namespace for your stuff.
    // You should change this to a namespace that is appropriate for your project.
    fluid.registerNamespace("audioFile");

    var environment = flock.init();

    // Expose any public functions or constructors as properties on your namesapce.
    audioFile.play = function () {
        var synth = flock.synth({
            synthDef: {
                ugen: "flock.ugen.playBuffer",
                buffer: {
                    id: "chord",
                    url: "./hillier-first-chord.wav"
                },



                loop: 1,

                start: 0,


            }
        });


        // If you're on iOS, you will need to call in a listener for
        // some kind of user input action, such a button click or touch handler.
        // This is because iOS will only play sound if the user initiated it.
        environment.start();
    };

}());


