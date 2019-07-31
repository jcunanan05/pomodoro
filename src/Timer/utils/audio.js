async function play(audioNode) {
  console.log(audioNode, 'playing bbruh');
  await audioNode.play();
}

export default {
  play,
};
