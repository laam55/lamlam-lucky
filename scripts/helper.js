function getNumPosition(num, pos) {
  return _.split(addZeroToNumber(num, 3), '')[pos] ?? 0;
}

function addZeroToNumber(num, maxLen = 3) {
  const countOfZero = maxLen - _.size(_.split(_.toString(num), ''));
  return `${_.repeat('0', countOfZero)}${_.toString(num)}`;
}

function PlayAudio(audioElement) {
  audioElement && audioElement.play();
}

function PauseAudio(audioElement) {
  audioElement && audioElement.play();
}

function MuteAudio(audioElement) {
  audioElement && (audioElement.muted = true);
}

function UnMuteAudio(audioElement) {
  audioElement && (audioElement.muted = false);
}

function StopAudio(audioElement) {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}

function IsEqualStr(v1, v2) {
  return !!_.toString(v1) && _.toString(v1) === _.toString(v2);
}

function GetLocalStorage(keyName, defaultVal = null) {
  var listResult = localStorage.getItem(keyName);
  try {
    listResult = JSON.parse(listResult);
  } catch {}
  return listResult || defaultVal;
}

function SaveLocalStorage(keyName, data) {
  try {
    localStorage.setItem(keyName, JSON.stringify(data));
  } catch {}
}
