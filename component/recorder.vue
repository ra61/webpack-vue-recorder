<template>
    <div id = 'recorder'>
        
        <div>
            <label>bitDepth</label>
            
            <select v-model="bitDepth">
                <option disabled value="">请选择</option>
                <option>8</option>
                <option>16</option>
            </select>
        </div>

        <div>
            <button @click = "init" :disabled="initButton">init recorder with options</button>
        </div>

        <h2>Recorder Commands</h2>
        <button @click = "start" :disabled="startButton">start</button>
        <button @click = "pause" :disabled="pauseButton">pause</button>
        <button @click = "resume" :disabled="resumeButton">resume</button>
        <button @click = "stop" :disabled="stopButton">stop</button>

        <h2>Recordings</h2>
        <ul id="recordingslist"></ul>

        <h2>Log</h2>
        <pre>{{ info }}</pre>

    </div>
</template>

<script>

    import Recorder from 'opus-recorder';

    export default {
        name: 'recorder',
        data () {
            return {
                bitDepth: 16,
                initButton: false,
                startButton: true,
                pauseButton: true,
                resumeButton: true,
                stopButton: true,
                info: '',
                recorder: undefined
            }
        },
        methods: {
            init:function(){

                this.initButton = true;
                this.startButton = false;

                this.recorder = new Recorder({
                    monitorGain:0,
                    recordingGain: 1,
                    numberOfChannels: 2,
                    wavBitDepth: 16,
                    encoderPath: "./waveWorker.min.js"
                });
                
                this.recorder.onstart = () => {
                    this.startButton = true;
                    this.pauseButton = false;
                    this.stopButton = false;
                    this.info = 'Recorder is started';
                };

                this.recorder.onpause = () => {
                    this.pauseButton = true;
                    this.resumeButton = false;
                    this.info = 'Recorder is paused';
                };

                this.recorder.onresume = () => {
                    this.resumeButton = true;
                    this.pauseButton = false;
                    this.info = 'Recorder is resuming';
                };

                this.recorder.onstop = () => {
                    this.pauseButton = true;
                    this.resumeButton = true;
                    this.stopButton = true;
                    this.initButton = false;
                    this.info = 'Recorder is stopped';
                };

                this.recorder.onstreamerror = function(e){
                    this.info = 'Error encountered: ' + e.message ;
                };

                this.recorder.ondataavailable = function( typedArray ){
                    
                    let dataBlob = new Blob( [typedArray], { type: 'audio/wav' } );
                    let fileName = new Date().toISOString() + ".wav";
                    let url = URL.createObjectURL( dataBlob );

                    let audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = url;

                    let link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    link.innerHTML = link.download;

                    let li = document.createElement('li');
                    li.appendChild(link);
                    li.appendChild(audio);

                    recordingslist.appendChild(li);
                };
            },
            start: function(){
                self = this;
                this.recorder.start().catch(function(e){
                    self.info = e.message;
                });
            },
            pause: function(){
                this.recorder.pause();
            },
            resume: function(){
                this.recorder.resume();
            },
            stop: function(){
                this.recorder.stop();
            }
        }
    }

  </script>

  <style type='text/css'>
    ul { list-style: none; }
    li { margin: 1em; }
    audio { display: block; }
  </style>
  