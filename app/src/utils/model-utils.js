import { loadFrozenModel } from '@tensorflow/tfjs-converter';

export async function loadModel(modelUrl, weightsUrl) {
  const model = await loadFrozenModel(modelUrl, weightsUrl);
  console.log('Loading model done');
  return model;
}
