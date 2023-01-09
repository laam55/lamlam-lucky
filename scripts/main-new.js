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
var listResult = [];
var appConfig = GetLocalStorage('appConfig', {
  numberLife: 10,
});
var current_life = 0;
var is_random = false;
var is_screen_number_lucky = true;
// enter to stop
var stop_random_now = false;
var stop_spin_now = false;
var is_stop_audio = true;
var is_muted = false;

var audio1ended = true;
var audio2ended = true;
var audio3ended = true;

HandleListStaff();
UpdateAudioBtn();
playSound();

async function HandleListStaff() {
  try {
    const res = await ListStaff();
    listResult = res?.response?.data ?? [];
    current_life = _.size(GetFilterListStaff(true)) || 0;
  } catch (err) {
    listResult = [];
    current_life = 0;
  }
  RenderInfoLife();
  RenderListResult();
}

// table
function RenderListResult() {
  result = `<thead>
        <tr>
          <th width="5%">STT</th>
          <th width="20%">Số may mắn</th>
          <th width="45%">Nhân sự</th>
          <th width="5%"></th>
        </tr>
      </thead>`;
  _.forEach(GetFilterListStaff(true), (item, index) => {
    result += `<tr
        data-staffId="${item?.staffId ?? ''}"
        data-id="${item?.id ?? ''}"
      >
        <td>${index + 1}</td>
        <td>${item?.code ?? ''}</td>
        <td>${
          `${
            item?.staffCode ? `${item?.staffCode} - ` : ''
          }<span style="color: yellow">${item?.name}</span>${
            item?.organizationName ? ` - ${item?.organizationName}` : ''
          }` ?? ''
        }</td>
        <td>
          <i class="hover-warning pointer fa fa-trash btn-delete"></i>
        </td>
      </tr>`;
  });
  $('#result-table').html(result);
  scrollToBottom();
}

$(document).on('click', '.btn-delete', function () {
  var isConfirm = confirm('Xác nhận xóa?');
  if (isConfirm) {
    const id = $(this).closest('tr').attr('data-id');
    const staffId = $(this).closest('tr').attr('data-staffId');
    SaveLuckyStaff(staffId, false);
    HandleListStaff();
  }
});

$(document).keypress(function (event) {
  event.preventDefault();

  var keycode = event.keyCode ? event.keyCode : event.which;
  if (IsEqualStr(keycode, 13) && is_random) {
    if (is_screen_number_lucky) {
      stop_random_now = true;
    } else {
      stop_spin_now = true;
    }
  }
  hide_modal();
});

function RenderInfoLife() {
  $('.info-life').html(`Lần quay ${current_life}/${appConfig?.numberLife}`);
}

function get_random_number() {
  const listNotIsGiftResult = _.map(GetFilterListStaff(false), 'code');

  if (!_.size(listNotIsGiftResult)) return null;

  return GetRandomItemInArray(listNotIsGiftResult);
}

function play_game() {
  play_game_effect();
  if (!is_random) {
    console.log('---- random ----', current_life, appConfig?.numberLife);
    if (current_life < (+appConfig?.numberLife || 0)) {
      let random_number = get_random_number();
      if (random_number) {
        handleAnimLuckyNumber($('.rdnCount'), 18500, random_number, 100);
        current_life++;
        RenderInfoLife();
      } else {
        toastr.error('Đã hết số để random!');
      }
      return;
    } else {
      toastr.error('Hết lượt quay!');
      return;
    }
  }
}

async function HandleSaveListResult(luckyNum) {
  console.log('--- end game! ---');
  StopAudio(blackjack_audio);
  is_random = false;
  stop_random_now = false;
  stop_spin_now = false;
  is_stop_audio = true;
  end_game_effect();
  const res = await SaveLuckyStaff(GetStaffByCode(luckyNum, 'staffId'), true);
  if (res?.code >= 400 && res?.code < 500) {
    toastr.error('Lỗi lưu kết quả!');
  }
  HandleListStaff();
}

function handleAnimLuckyNumber($target, duration, num, speed = 80) {
  var $target, started, current, text;
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
      HandleSaveListResult(num);
      show_modal(
        'Xin chúc mừng số may mắn <b style=color:red>' +
          num +
          '</b> đã trúng thưởng!',
      );
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

function GetFilterListStaff(isGift = null) {
  return _.filter(
    listResult,
    (o) =>
      _.isNull(isGift) || (isGift && !!o?.isGift) || (!isGift && !o?.isGift),
  );
}

function GetStaffByCode(code, keyName = null) {
  const staffData = _.find(listResult, (o) => IsEqualStr(o?.code, code));
  if (keyName) {
    return staffData?.[keyName];
  }
  return staffData;
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

// ------------------------------------------------------
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

// ------------------------------------------------------
// Audio

function ToggleMute() {
  is_muted = !is_muted;
  UpdateAudioBtn();
}

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

function scrollToBottom() {
  var objDiv = document.getElementById('result-div');
  if (objDiv) {
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}
