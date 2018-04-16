#!/bin/bash
mkdir "public/models/mobilenet"
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/optimized_model.pb' --output 'public/models/mobilenet/optimized_model.pb'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/weights_manifest.json' --output 'public/models/mobilenet/weights_manifest.json'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/group1-shard1of5' --output 'public/models/mobilenet/group1-shard1of5'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/group1-shard2of5' --output 'public/models/mobilenet/group1-shard2of5'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/group1-shard3of5' --output 'public/models/mobilenet/group1-shard3of5'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/group1-shard4of5' --output 'public/models/mobilenet/group1-shard4of5'
curl 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v1_1.0_224/group1-shard5of5' --output 'public/models/mobilenet/group1-shard5of5'
