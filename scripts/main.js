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
// var background_audio = document.getElementById('wheel1_audio');
var wheel1 = document.getElementById('wheel1_audio');
var wheel2 = document.getElementById('wheel2_audio');
var wheel3 = document.getElementById('wheel3_audio');
var wheel_end = document.getElementById('wheel_end');
var click_sound = document.getElementById('click_sound');

// list number
var listResult = localStorage.getItem('listResult');
if (listResult) {
  listResult = JSON.parse(listResult);
} else {
  listResult = [];
}

var ignoreListNumber = localStorage.getItem('ignoreListNumber');
if (ignoreListNumber) {
  ignoreListNumber = ignoreListNumber.split(',');
  ignoreListNumber = ignoreListNumber.map((item) => {
    if (!item) item = 0;
    return parseInt(item);
  });
} else {
  ignoreListNumber = [
    279, 280, 281, 283, 284, 244, 258, 259, 260, 261, 262, 263, 264, 271, 272,
  ];
}

var appConfig = localStorage.getItem('appConfig');
if (appConfig) {
  appConfig = JSON.parse(appConfig);
} else {
  appConfig = {
    numberLife: 63,
    listConfig: [
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-287',
      '101-301',
      '101-301',
      '101-301',
      '101-301',
      '101-301',
      '101-301',
      '101-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '101-107,109-113,115-117,119-122,126-129,131-149,151,153-159,161,163,165-167,172,174,176,179-185,187-190,193-207,209-216,219-248,251-272,274-290,292-253,258-274,285-301',
      '288-301',
    ],
    listConfigUser: {
      1: 'Pham Tung Lam',
      2: 'Pham Tung Lam 2',
      3: 'Pham Tung Lam 3',
      4: 'Pham Tung Lam 4',
      5: 'Pham Tung Lam 5 ',
      6: 'Pham Tung Lamm 6',
    },
  };
  localStorage.setItem('appConfig', JSON.stringify(appConfig));
}
var appConfigLuckyPage = localStorage.getItem('appConfigLuckyPage') || null;
var current_life = localStorage.getItem('current_life') || 0;
var is_random = false;
var is_screen_number_lucky = true;
// enter to stop
var stop_random_now = false;
var stop_spin_now = false;
var is_muted = true;

// SCREEN
reload_screen();
load_list_result();
function reload_screen(argument) {
  if (is_screen_number_lucky) {
    $('#wrap-wheel-lucky').hide();
    $('#inca').hide();
    $('.rdnCount').show();
    $('.button-play-1 span').html(1);
  } else {
    $('#wrap-wheel-lucky').show();
    $('#inca').show();
    $('.rdnCount').hide();
    $('.button-play-1 span').html(2);
  }
}

function switch_screen_game(argument) {
  if (!is_random) {
    is_screen_number_lucky = !is_screen_number_lucky;
    reload_screen();

    // end effect
    stop_random_now = false;
    stop_spin_now = false;
    $('#canvas').hide();
    $('.rdnCount').removeClass('scale-effect');
    $('.button-play-1').addClass('not-allowed');
  }
}

var audio1ended = true;
var audio2ended = true;
var audio3ended = true;

function playSound() {
  if (!is_muted) {
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
  var conf = confirm('Want to delete?');
  if (conf) {
    current_life = current_life > 0 ? current_life - 1 : 0;
    listResult.splice(index, 1);
    localStorage.setItem('current_life', current_life);
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

function load_list_result(argument) {
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
          <td>${item.name}</td>
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

function hide_modal(alert) {
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
function play_game_effect(argument) {
  $('#canvas').hide();
  $('.rdnCount').removeClass('scale-effect');
  $('.button-play-1').addClass('not-allowed');
  click_sound.play();
}

function end_game_effect(argument) {
  $('.rdnCount').addClass('scale-effect');
  $('#canvas').show();
  $('.button-play-1').removeClass('not-allowed');

  var audio3 = document.getElementById('wheel_end');
  audio3.play();

  // setTimeout(() => {
  // 	$('#canvas').hide()
  // 	$('.rdnCount').removeClass('scale-effect')
  // }, 5000)
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
// edn effect game

function generate_random_number(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
          <td>${item.name}</td>
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

function get_random_number(string) {
  let listResultNumber = _.compact(_.map(listResult, 'name'));
  let listIgnoreNumbers = [...listResultNumber, ...ignoreListNumber];
  let random_number = null;
  let list = _.split(string, ',');
  let listAfterConvert = [];

  if (string) {
    list.forEach((item) => {
      listAfterConvert = [
        ...listAfterConvert,
        ...getListNumberFromString(item),
      ];
    });
    listAfterConvert = _.filter(listAfterConvert, function (number) {
      return !listIgnoreNumbers.includes(number);
    });
    let random_position = Math.floor(Math.random() * listAfterConvert.length);
    random_number = listAfterConvert[random_position];
  }

  return random_number;
}
function play_game() {
  console.log('start game!');
  play_game_effect();
  if (!is_random) {
    if (is_screen_number_lucky) {
      console.log('---- random ----');
      if (appConfig.listConfig && appConfig.listConfig[current_life]) {
        let random_number = get_random_number(
          appConfig.listConfig[current_life],
        );
        if (random_number) {
          rdnCounter($('.rdnCount'), 88888888, random_number, 80);
          current_life++;
          localStorage.setItem('current_life', current_life);
          update_info_life();
        } else {
          toastr.success('Đã hết số để random!');
        }
      } else if (appConfig.listConfig) {
        toastr.success(
          'Hết lượt, chuyển sang đang chế độ thử nghiệm, không tính kết quả!',
        );
        let random_number = generate_random_number(1000, 9999);
        rdnCounter($('.rdnCount'), 88888888, random_number, 80, true);
      } else {
        toastr.success(
          'Chưa config lượt chơi, chuyển sang đang chế độ thử nghiệm, không tính kết quả!',
        );
        let random_number = generate_random_number(1000, 9999);
        rdnCounter($('.rdnCount'), 88888888, random_number, 80, true);
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
  is_muted = true;
  end_game_effect();
  update_inner_table();
}

function writeAndSaveListResult(name, number) {
  let today = new Date();
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  resultItem = {
    time: `${time} ${date}`,
    name: name,
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
  is_muted = false;
  // set initial force randomly
  // force = Math.floor(Math.random() * randForce) + minForce;
  force = 888888888;
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
        'Chúc mừng người có số <b style=color:red>' +
          result +
          '</b> đã trúng thường!',
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
// rdnCounter($(".rdnCount"), 2000);
// from 0 to N
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
function rdnCounter($target, duration, num, speed, isTest = false) {
  var $target, started, current, text, len;
  num = num || $target.data('count');
  speed = 80;
  len = (num + '').length;
  started = new Date().getTime();
  is_random = true;
  is_muted = false;

  animationTimer = setInterval(function () {
    current = new Date().getTime();
    playSound();
    if (current - started >= duration || stop_random_now) {
      stop_random_now = false;
      clearInterval(animationTimer);
      $target.text(num);
      if (!isTest) {
        writeAndSaveListResult(num, num);
        show_modal(
          'Chúc mừng người có số <b style=color:red>' +
            num +
            '</b> đã trúng thường!',
        );
        // if (appConfig.listConfigUser && appConfig.listConfigUser[num]) {
        // 	writeAndSaveListResult(appConfig.listConfigUser[num], num)
        // } else {
        // 	toastr.warning("Không có người này!")
        // }
      }
      // update result
      end_game($target);
    } else {
      // Generate a random string to use for the next animation step
      text = '';
      for (var i = 0; i < 3; i++) {
        text += Math.floor(Math.random() * 10);
      }
      $target.text(text);
    }
  }, speed);
}
