<template>
    <div id = 'recorder'>
        <div>
            <label>monitorGain</label>
            <input id="monitorGain" type="number" value="0" />
        </div>

        <div>
            <label>recordingGain</label>
            <input id="recordingGain" type="number" value="1" />
        </div>

        <div>
            <label>numberOfChannels</label>
            <input id="numberOfChannels" type="number" value="1" />
        </div>

        <div>
            <label>bitDepth</label>
            <input id="bitDepth" type="number" value="16" />
        </div>

        <div>
            <button @click = "init">init recorder with options</button>
        </div>

        <h2>Recorder Commands</h2>
        <button id="start" disabled>start</button>
        <button id="pause" disabled>pause</button>
        <button id="resume" disabled>resume</button>
        <button id="stopButton" disabled>stop</button>

        <h2>Recordings</h2>
        <ul id="recordingslist"></ul>

        <h2>Log</h2>
        <pre id="log"></pre>
    </div>
</template>

<script>

    import Recorder from 'opus-recorder';
    // import waveWorker from "opus-recorder/dist/waveWorker.min.js";

    export default {
        name: 'recorder',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            init:function(){
                let recorder = new Recorder({
                        monitorGain:0,
                        recordingGain: 1,
                        numberOfChannels: 1,
                        wavBitDepth: 16,
                        // encoderPath: "./waveWorker.bundle.js"
                        encoderPath: "./waveWorker.min.js"
                    });
                console.log(recorder);
                recorder.start().catch(function(e){
                    console.log(e.message);
                });
            },

        }
    }

    // function screenLogger(text, data) {
    //   log.innerHTML += "\n" + text + " " + (data || '');
    // }

    // if (!Recorder.isRecordingSupported()) {
    //   screenLogger("Recording features are not supported in your browser.");
    // }

    // else {
    //   init.addEventListener( "click", function(){
    //     init.disabled = true;
    //     start.disabled = false;
    //     monitorGain.disabled = true;
    //     recordingGain.disabled = true;
    //     numberOfChannels.disabled = true;
    //     bitDepth.disabled = true;
  
    //     var recorder = new Recorder({
    //       monitorGain: parseInt(monitorGain.value, 10),
    //       recordingGain: parseInt(recordingGain.value, 10),
    //       numberOfChannels: parseInt(numberOfChannels.value, 10),
    //       wavBitDepth: parseInt(bitDepth.value,10),
    //       encoderPath: "../dist/waveWorker.min.js"
    //     });

    //     pause.addEventListener( "click", function(){ recorder.pause(); });
    //     resume.addEventListener( "click", function(){ recorder.resume(); });
    //     stopButton.addEventListener( "click", function(){ recorder.stop(); });
    //     start.addEventListener( "click", function(){ 
    //       recorder.start().catch(function(e){
    //         screenLogger('Error encountered:', e.message );
    //       });
    //     });

    //     recorder.onstart = function(){
    //       screenLogger('Recorder is started');
    //       start.disabled = resume.disabled = true;
    //       pause.disabled = stopButton.disabled = false;
    //     };

    //     recorder.onstop = function(){
    //       screenLogger('Recorder is stopped');
    //       start.disabled = false;
    //       pause.disabled = resume.disabled = stopButton.disabled = true;
    //     };

    //     recorder.onpause = function(){
    //       screenLogger('Recorder is paused');
    //       pause.disabled = start.disabled = true;
    //       resume.disabled = stopButton.disabled = false;
    //     };

    //     recorder.onresume = function(){
    //       screenLogger('Recorder is resuming');
    //       start.disabled = resume.disabled = true;
    //       pause.disabled = stopButton.disabled = false;
    //     };

    //     recorder.onstreamerror = function(e){
    //       screenLogger('Error encountered: ' + e.message );
    //     };

    //     recorder.ondataavailable = function( typedArray ){
    //       var dataBlob = new Blob( [typedArray], { type: 'audio/wav' } );
    //       var fileName = new Date().toISOString() + ".wav";
    //       var url = URL.createObjectURL( dataBlob );

    //       var audio = document.createElement('audio');
    //       audio.controls = true;
    //       audio.src = url;

    //       var link = document.createElement('a');
    //       link.href = url;
    //       link.download = fileName;
    //       link.innerHTML = link.download;

    //       var li = document.createElement('li');
    //       li.appendChild(link);
    //       li.appendChild(audio);

    //       recordingslist.appendChild(li);
    //     };
    //   });
    // }

  </script>

  <style type='text/css'>
    ul { list-style: none; }
    li { margin: 1em; }
    audio { display: block; }
  </style>