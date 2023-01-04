toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

// sound
var wheel1 = document.getElementById('wheel1_audio');
var wheel2 = document.getElementById('wheel2_audio');
var wheel3 = document.getElementById('wheel3_audio');
var blackjack_audio = document.getElementById('blackjack_audio');
var wheel_end = document.getElementById('wheel_end');
var click_sound = document.getElementById('click_sound');

// list number
var listResult = localStorage.getItem('listResult');
if (listResult) {
  listResult = JSON.parse(listResult);
} else {
  listResult = [];
}

var appConfig = {
  numberLife: 10,
  range: [1, 150],
};
var current_life = _.size(listResult) || 0;
var is_random = false;
var is_screen_number_lucky = true;
// enter to stop
var stop_random_now = false;
var stop_spin_now = false;
var is_stop_audio = true;
var is_muted = false;

load_list_result();

function UpdateAudioBtn() {
  if (is_muted) {
    MuteAudio(wheel1);
    MuteAudio(wheel2);
    MuteAudio(wheel3);
    MuteAudio(wheel_end);
    MuteAudio(click_sound);
    MuteAudio(blackjack_audio);
    $('.button-play-1 span').html(
      `<i class="fa fa-volume-off" aria-hidden="true"></i>`,
    );
  } else {
    UnMuteAudio(wheel1);
    UnMuteAudio(wheel2);
    UnMuteAudio(wheel3);
    UnMuteAudio(wheel_end);
    UnMuteAudio(click_sound);
    UnMuteAudio(blackjack_audio);
    $('.button-play-1 span').html(
      `<i class="fa fa-volume-up" aria-hidden="true"></i>`,
    );
  }
}

function ToggleMute() {
  is_muted = !is_muted;
  UpdateAudioBtn();
}

var audio1ended = true;
var audio2ended = true;
var audio3ended = true;

function playSound() {
  if (!is_stop_audio) {
    var audio = document.getElementById('wheel1_audio');
    if (audio1ended) {
      audio1ended = false;
      audio.play();
      audio.addEventListener(
        'ended',
        function () {
          audio1ended = true;
        },
        false,
      );
    } else if (audio2ended) {
      audio2ended = false;
      var audio2 = document.getElementById('wheel2_audio');
      audio2.play();
      audio2.addEventListener(
        'ended',
        function () {
          audio2ended = true;
        },
        false,
      );
    } else if (audio3ended) {
      audio3ended = false;
      var audio3 = document.getElementById('wheel3_audio');
      audio3.play();
      audio3.addEventListener(
        'ended',
        function () {
          audio3ended = true;
        },
        false,
      );
    }
  }
}
playSound();

function delete_result(index) {
  var conf = confirm('Xác nhận xóa?');
  if (conf) {
    current_life = current_life > 0 ? current_life - 1 : 0;
    listResult.splice(index, 1);
    update_info_life();
    localStorage.setItem('listResult', JSON.stringify(listResult));
    update_inner_table();
  }
}

function scrollToBottom() {
  var objDiv = document.getElementById('result-div');
  if (objDiv) {
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}

function load_list_result() {
  result = `<thead>
        <tr>
          <th width="10%">STT</th>
          <th width="45%">Số may mắn</th>
          <th width="45%">Thời gian</th>
          <th width="5%"></th>
        </tr>
      </thead>`;
  listResult.forEach((item, index) => {
    result += `<tr>
          <td>${index + 1}</td>
          <td>${item?.luckyNum ?? ''}</td>
          <td>${item.time}</td>
          <td><i class="hover-warning pointer fa fa-trash" onClick="delete_result(${index})"></i></td>
        </tr>`;
  });
  $('#result-table').html(result);
  scrollToBottom();
}
// END SCREEN

// SHOW MODAL
function show_modal(alert) {
  $('.app-modal-container ').show();
  $('.app-modal-container .app-modal-content').html(alert);
}

$('.app-modal-container .ok').click(function (e) {
  hide_modal();
});

function hide_modal() {
  $('.app-modal-container').hide();
}

$(document).click(function () {
  $('.app-modal-container').hide();
});

$('.app-modal-container').click(function (event) {
  event.stopPropagation();
});
// HIDE MODAL

// EFFECT GAME
function play_game_effect() {
  $('#canvas').hide();
  $('.rdnCount').removeClass('scale-effect');
  click_sound.play();
}

function end_game_effect() {
  $('.rdnCount').addClass('scale-effect');
  $('#canvas').show();

  var audio3 = document.getElementById('wheel_end');
  audio3.play();
}
// effect dynamic image corner
$(document).on('mousemove', function (event) {
  var $mouseX = event.pageX,
    $mouseY = event.pageY;
  $('.follow-mouse-bottom').css('bottom', 30 - $mouseY * 0.05 + 'px');
  $('.follow-mouse-right').css('right', 30 - $mouseX * 0.05 + 'px');

  $('.follow-mouse-left').css('left', 30 - $mouseY * 0.05 + 'px');
  $('.follow-mouse-top').css('top', 30 - $mouseX * 0.05 + 'px');
});
$(document).keypress(function (event) {
  event.preventDefault();

  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == '13' && is_random) {
    if (is_screen_number_lucky) {
      stop_random_now = true;
    } else {
      stop_spin_now = true;
    }
  }
  hide_modal();
});

// table
function update_inner_table() {
  result = `<thead>
        <tr>
          <th width="10%">STT</th>
          <th width="45%">Số may mắn</th>
          <th width="45%">Thời gian</th>
          <th width="5%"></th>
        </tr>
      </thead>`;
  listResult.forEach((item, index) => {
    result += `<tr>
          <td>${index + 1}</td>
          <td>${item?.luckyNum ?? ''}</td>
          <td>${item.time}</td>
          <td><i class="hover-warning pointer fa fa-trash" onClick="delete_result(${index})"></i></td>
        </tr>`;
  });
  $('#result-table').html(result);
  scrollToBottom();
}

update_info_life();
function update_info_life() {
  $('.info-life').html(`Lần quay ${current_life}/${appConfig.numberLife}`);
}

// 1-200 -> 1,2,...200
function getListNumberFromString(string) {
  let result = _.split(string, '-');
  let array = [];
  if (result.length > 1) {
    result[0] = parseInt(result[0]);
    result[1] = parseInt(result[1]);
    if (result[0] < result[1]) {
      array = _.range(result[0], result[1] + 1);
    } else if (result[0] == result[1]) {
      array = [result];
    } else {
      array = _.range(result[1], result[0] + 1);
    }
  } else {
    array = [result];
  }
  return array;
}

function get_random_number(range) {
  let randNum = _.random(range?.[0], range?.[1]);
  while (!!_.find(listResult, (o) => IsEqualStr(o?.luckyNum, randNum))) {
    randNum = get_random_number(range);
  }
  return randNum;
}

function play_game() {
  console.log('start game!', appConfig, current_life);
  play_game_effect();
  if (!is_random) {
    if (is_screen_number_lucky) {
      console.log('---- random ----');
      if (current_life < appConfig?.numberLife) {
        let random_number = get_random_number(appConfig.range);
        if (random_number) {
          handleAnimLuckyNumber($('.rdnCount'), 18500, random_number, 100);
          current_life++;
          update_info_life();
        } else {
          toastr.error('Đã hết số để random!');
        }
        return;
      } else {
        toastr.error('Hết lượt quay!');
        return;
      }
    } else {
      // spinn
      console.log('---- spinning ----');
      roulette_spin();
    }
  }
}

function end_game($target) {
  // hieu ung end game
  console.log('end game!');
  is_random = false;
  stop_random_now = false;
  stop_spin_now = false;
  is_stop_audio = true;
  end_game_effect();
  update_inner_table();
}

function writeAndSaveListResult(luckyNum) {
  let today = new Date();
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  resultItem = {
    time: `${time} ${date}`,
    luckyNum,
    gameType: 1,
  };
  listResult.push(resultItem);
  localStorage.setItem('listResult', JSON.stringify(listResult));
}

// spinning wheel
var values = [
  '1 cái hôn',
  '50.000vnđ',
  'SUZUKI',
  '100.000vnđ',
  'FERRARI',
  'Chúc bạn may mắn lần sau ^^',
  'IPAD',
  'ASUS',
].reverse();

function roulette_spin(btn) {
  is_random = true;
  is_stop_audio = false;
  // set initial force randomly
  // force = Math.floor(Math.random() * randForce) + minForce;
  force = 8888888;
  requestAnimationFrame(doAnimation);
}

var total = 0;

function doAnimation() {
  // new angle is previous angle + force modulo 360 (so that it stays between 0 and 360)
  oldAngle = angle;
  angle = (angle + force) % 360;
  // decay force according to inertia parameter
  force *= inertia;
  if (stop_spin_now) {
    stop_spin_now = false;
    force = force < 12 ? force : 12;
  }
  total += Math.abs(angle - oldAngle) > 10 ? 4 : Math.abs(angle - oldAngle);
  if (total > 5) {
    total = 0;
    playSound();
  }
  rouletteElem.style.transform = 'rotate(' + angle + 'deg)';
  // stop animation if force is too low
  if (force < 0.05) {
    // score roughly estimated
    result = values[Math.floor((angle / 360) * values.length - 0.5)];
    // scoreElem.innerHTML = result
    if (result) {
      show_modal(
        'Xin chúc mừng số may mắn <b style=color:red>' +
          result +
          '</b> đã trúng thưởng!',
      );
    } else {
      show_modal('Không có kết quả!');
    }
    end_game();
    return;
  }
  requestAnimationFrame(doAnimation);
}

// random number
$('.count').each(function () {
  $(this)
    .prop('Counter', 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 4000,
        easing: $(this).data('esing'),
        step: function (now) {
          $(this).text(Math.ceil(now));
        },
      },
    );
});

function handleAnimLuckyNumber(
  $target,
  duration,
  num,
  speed = 80,
  isTest = false,
) {
  var $target, started, current, text, len;
  num = num || $target.data('count');
  len = (num + '').length;
  started = new Date().getTime();
  is_random = true;
  is_stop_audio = false;

  PlayAudio(blackjack_audio);

  animationTimer = setInterval(function () {
    current = new Date().getTime();
    playSound();
    if (current - started >= duration || stop_random_now) {
      stop_random_now = false;
      clearInterval(animationTimer);
      $target.html(GetHtmlGoldText(addZeroToNumber(num, 3)));
      if (!isTest) {
        StopAudio(blackjack_audio);
        writeAndSaveListResult(num);
        show_modal(
          'Xin chúc mừng số may mắn <b style=color:red>' +
            num +
            '</b> đã trúng thưởng!',
        );
      }
      end_game($target);
    } else {
      text = '';
      for (var i = 0; i < 3; i++) {
        if (current - started > (duration / 3) * (i + 1)) {
          text += GetHtmlGoldText(getNumPosition(num, i));
        } else {
          text += GetHtmlGoldText(Math.floor(Math.random() * 10));
        }
      }
      $target.html(text);
    }
  }, speed);
}

function GetHtmlGoldText(numStr) {
  return _.reduce(
    _.split(_.toString(numStr), ''),
    (html, item) => {
      return `${html}<span class="gold-text">${item}</span>`;
    },
    '',
  );
}

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
