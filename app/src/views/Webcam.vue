<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-2">
        <v-layout>
          <v-flex xs6 offset-xs3>
            <video ref="video" id="video" width="640" height="480" autoplay></video>
            <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
          </v-flex>
        </v-layout>
        <v-btn color="warn" v-on:click="loadModel()">Load model</v-btn>
        <v-btn color="info" v-on:click="predict()">Predict</v-btn>
        <v-btn color="info" v-on:click="capture()">Take Photo</v-btn>
      </v-card>
      <v-card class="pa-2 ma-2">
        <img :src="c" height="50" v-for="(c, index) in captures" :key="index" />
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import Mobilenet from '../utils/models/mobilenet';

export default {
  name: 'webcam',
  data() {
    return {
      captures: [],
      model: null,
    };
  },
  computed: {
    modelClass() {
      return Mobilenet;
    },
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },
  methods: {
    async loadModel() {
      this.model = new this.modelClass();
      await this.model.load();
    },
    capture() {
      this.canvas = this.$refs.canvas;
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL('image/png'));
    },
    predict() {
      if (this.model) {
        this.canvas = this.$refs.canvas;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480);
        const predictions = this.model.predict(this.canvas);
        console.log('prediction done');
        const result = Mobilenet.getTopKClasses(predictions, 5);
        console.log(result);
      } else {
        console.error('Model not loaded yet');
      }
    },
  },
};
</script>

<style scoped>
  #canvas {
    display: none;
  }
</style>
