class panX extends AudioWorkletProcessor {

  // Custom AudioParams can be defined with this static getter.
  static get parameterDescriptors() {
    return [{ name: 'panAudioParam', defaultValue: 0 }];
  }

  constructor(dictionary) {
    super(dictionary);
    this.channelCount = dictionary.channelCount;
    this.leftOutput = 0;
  }

  //TODO
  //up mix mono signal to stereo
  process(inputs, outputs, parameters) {
    let input = inputs[0];
    //console.log("input . length in panx" + input.length);
    let output = outputs[0];

    let panParameter = parameters.panAudioParam; //.22
    let rangePerSpeaker = 1.0 / output.length; //.03125
    let pan = (panParameter[0] % rangePerSpeaker); //1.6
    pan = pan / rangePerSpeaker;

    let speaker = Math.floor(panParameter[0] * output.length);
    let nextSpeaker = speaker + 1;
    if(this.leftOutput != speaker) { //switching primary stereo speaker pairs
      pan = 0;
      this.leftOutput = speaker;
    }

    // console.log("speaker" + speaker + "next" + nextSpeaker);
    for (let channel = 0; channel < output.length; ++channel) {
      if(channel == nextSpeaker)
      {
        let outputChannel = output[channel];
        let inputChannel = input[0];
        for (let i = 0; i < inputChannel.length; ++i) {
          outputChannel[i] = inputChannel[i] * pan;
        }
      }
      else if(channel == speaker)
      {
        let outputChannel = output[channel];
        let inputChannel = input[1];
        for (let i = 0; i < inputChannel.length; ++i) {
          outputChannel[i] = inputChannel[i] * (1.0 - pan);
        }
      } 
    }
    return true;
  }
}
registerProcessor('panX', panX);