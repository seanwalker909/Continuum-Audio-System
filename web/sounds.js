(function () {
    "use strict";
    fluid.registerNamespace("sounds");

    var environment = flock.init({
        chans: 16,
        outputs: 16
    });

    environment.start();

    sounds.playSynth = function () {
        var mySynth = flock.synth({
            synthDef: {
                ugen: "flock.ugen.sin",
                freq: {
                    ugen: "flock.ugen.lfNoise",
                    freq: 10,
                    mul: 380,
                    add: 60
                },
                mul: 0.1
            }
        });

    };
    sounds.playAudioFile = function () {
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
    };


    // Granulates live audio from the microphone.
    // Wear headphones to prevent feedback.
    sounds.granulate = function () {
        var synth = flock.synth({
            synthDef: {
                ugen: "flock.ugen.granulator",
                delayDur: 0.25,
                numGrains: {
                    ugen: "flock.ugen.lfNoise",
                    freq: 0.5,
                    mul: 75,
                    add: 75,
                    options: {
                        interpolation: "linear"
                    }
                },
                source: {
                    ugen: "flock.ugen.audioIn"
                }
            }
        });
    };

    sounds.pan2 = function (panVal) {
        var synth = flock.synth({
            synthDef: {
                id: "pan2",
                ugen: "flock.ugen.pan2",
                pan: panVal,
                source: {
                    ugen: "flock.ugen.sinOsc",
                    freq: 440,
                    mul: 0.03
                }
            }
        });
    };



}());