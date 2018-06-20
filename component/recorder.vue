<template>
    <el-main id = 'recorder'>
        
        <div class="row">
            <label>声道：</label>
            <el-select v-model="channel" placeholder="请选择">
                <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="row">
            <label>采样率：</label>
            <el-select v-model="bitDepth" placeholder="请选择">
                <el-option
                v-for="item in bitDepthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <!-- <select v-model="bitDepth">
                <option disabled value="">请选择</option>
                <option>8</option>
                <option>16</option>
            </select> -->
        </div>
        <div class="row">
            <label>输出格式：</label>
            <el-select v-model="exportFormat" placeholder="请选择">
                <el-option
                v-for="item in exportFormatOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div style="margin-top:15px;">
            <el-button type="primary" @click = "init" :disabled="initButton" >init recorder</el-button>
            <!-- <button @click = "init" :disabled="initButton">init recorder with options</button> -->
        </div>

        <h2>Recorder Commands</h2>
        <!-- <el-button type="primary" @click = "start" :disabled="startButton" class="el-icon-caret-right"></el-button> -->

        <el-button type="primary" @click = "start" :disabled="startButton">start</el-button>
        <el-button type="primary" @click = "pause" :disabled="pauseButton">pause</el-button>
        <el-button type="primary" @click = "resume" :disabled="resumeButton">resume</el-button>
        <el-button type="primary" @click = "stop" :disabled="stopButton">stop</el-button>
        <!-- <button @click = "start" :disabled="startButton">start</button>
        <button @click = "pause" :disabled="pauseButton">pause</button>
        <button @click = "resume" :disabled="resumeButton">resume</button>
        <button @click = "stop" :disabled="stopButton">stop</button> -->

        <h2>Recordings</h2>
        <ul id="recordingslist"></ul>

        <h2>Log</h2>
        <pre>{{ info }}</pre>

    </el-main>
</template>

<script>

    import Recorder from 'opus-recorder';

    export default {
        name: 'recorder',
        data () {
            return {
                channelOptions: [{
                    value: '单声道',
                    label: 1
                    }, {
                    value: '双声道',
                    label: 2
                }],
                channel: 2,
                bitDepthOptions: [{
                    value: '8',
                    label: '8'
                    }, {
                    value: '16',
                    label: '16'
                }],
                bitDepth: 16,
                exportFormatOptions:[{
                    value: 'wav',
                    label: 'wav'
                    }, {
                    value: 'pcm',
                    label: 'pcm'
                }],
                exportFormat:'wav',
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
                self = this;
                this.initButton = true;
                this.startButton = false;

                if(self.exportFormat === 'wav'){
                    this.recorder = new Recorder({
                        monitorGain:0,
                        recordingGain: 1,
                        numberOfChannels: self.channel,
                        wavBitDepth: self.bitDepth,
                        encoderPath: "./waveWorker.min.js"
                    });
                } else {
                    this.recorder = new Recorder({
                        monitorGain:0,
                        recordingGain: 1,
                        numberOfChannels: self.channel,
                        wavBitDepth: self.bitDepth,
                        encoderPath: "./pcmWorker.min.js"
                    });
                }
                
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

                    let dataBlob, fileName;

                    if(self.exportFormat === 'wav'){
                        dataBlob = new Blob( [typedArray], { type: 'audio/wav' } );
                        fileName = new Date().toISOString() + ".wav";
                        
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
                    } else {
                        dataBlob = new Blob( [typedArray], { type: 'audio/pcm' } );
                        fileName = new Date().toISOString() + ".pcm";

                        let url = URL.createObjectURL( dataBlob );
                        let link = document.createElement('a');
                        link.href = url;
                        link.download = fileName;
                        link.innerHTML = link.download;

                        let li = document.createElement('li');
                        li.appendChild(link);

                        recordingslist.appendChild(li);
                    }
                    
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
    label { width: 120px;display: inline-block;text-align: right; }
    .row { margin:5px 0; }
  </style>
  