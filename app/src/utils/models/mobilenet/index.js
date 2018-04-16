/**
 * @license
 * Contains snippets from https://github.com/tensorflow/tfjs-converter/blob/master/demo/mobilenet.js
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import _ from 'lodash';
import * as tfc from '@tensorflow/tfjs-core';
import { loadModel } from '../../model-utils';
import { IMAGENET_CLASSES } from './imagenet_classes';

const MODEL_URL = '/models/mobilenet/optimized_model.pb';
const WEIGHTS_URL = '/models/mobilenet/weights_manifest.json';

const INPUT_NODE_NAME = 'input';
const OUTPUT_NODE_NAME = 'MobilenetV1/Predictions/Reshape_1';
const PREPROCESS_DIVISOR = tfc.scalar(255 / 2);

export default class MobileNet {
  async load() {
    this.model = await loadModel(MODEL_URL, WEIGHTS_URL);
  }

  predict(source) {
    const input = tfc.fromPixels(source);
    const preprocessedInput = tfc.div(
      tfc.sub(input.asType('float32'), PREPROCESS_DIVISOR),
      PREPROCESS_DIVISOR,
    );
    const reshapedInput =
        preprocessedInput.reshape([1, ...preprocessedInput.shape]);
    const dict = {};
    dict[INPUT_NODE_NAME] = reshapedInput;
    return this.model.execute(dict, OUTPUT_NODE_NAME);
  }

  static getTopKClasses(predictions, topK) {
    const values = predictions.dataSync();
    predictions.dispose();

    let predictionList = _.map(values, (value, index) => ({ value, index }));
    console.log(IMAGENET_CLASSES);
    console.log(predictionList);

    predictionList = predictionList
      .sort((a, b) => b.value - a.value)
      .slice(0, topK);

    return predictionList.map(x => ({ label: IMAGENET_CLASSES[x.index], value: x.value }));
  }
}
