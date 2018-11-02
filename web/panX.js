class panX extends AudioWorkletProcessor {

  // Custom AudioParams can be defined with this static getter.
  static get parameterDescriptors() {
    return [{ name: 'gain', defaultValue: 0 },
    { name: 'leftChannel', defaultValue: 0 },
    { name: 'rightChannel', defaultValue: 1 }];
  }

  constructor(dictionary) {
    super(dictionary);
    // this.channelCount = dictionary.channelCount;
    // this.numberOfInputs = dictionary.numberOfInputs;
    // this.numberOfOutputs = dictionary.numberOfOutputs;
    // this.outputChannelCount = dictionary.outputChannelCount;
  }

  process(inputs, outputs, parameters) {
    let leftChannelParameter = parameters.leftChannel;
    let rightChannelParameter = parameters.rightChannel;
    let gain = parameters.gain;

    let leftinput = inputs[0];
    let rightinput = inputs[1];
    leftinput = leftinput[0];
    rightinput = rightinput[0];
    
    let leftoutput = outputs[Math.floor(leftChannelParameter[0])];
    let rightoutput = outputs[Math.floor(rightChannelParameter[0])];
    leftoutput = leftoutput[0];
    rightoutput = rightoutput[0];

    if (gain.length === 1)
      for (let i = 0; i < leftinput.length; ++i) {
        leftoutput[i] = leftinput[i];// * gain[0];
        rightoutput[i] = rightinput[i];// * gain[0];
      }
    else
      for (let i = 0; i < leftinput.length; ++i) {
        leftoutput[i] = leftinput[i];// * gain[i];
        rightoutput[i] = rightinput[i];// * gain[i];
      }
    return true;
  }//process
}//panX
registerProcessor('panX', panX);