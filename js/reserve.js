(function () {
  'use strict';

  var form = document.getElementById('reserveForm');
  if (!form) return;

  /* ---------- カレンダー ---------- */
  var WEEK = ['日', '月', '火', '水', '木', '金', '土'];
  var MONTHS_AHEAD = 2; // 何ヶ月先まで選べるか
  // 選べない曜日（0=日〜6=土）。定休日が決まったら追加してください（例：[1] で月曜休み）
  var CLOSED_WEEKDAYS = [];

  var grid = document.getElementById('calGrid');
  var monthLabel = document.getElementById('calMonth');
  var prevBtn = document.getElementById('calPrev');
  var nextBtn = document.getElementById('calNext');
  var selectedLabel = document.getElementById('calSelected');
  var dateInput = document.getElementById('dateInput');

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1); // 翌日から予約可能
  var maxDate = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD + 1, 0);

  var view = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  var selected = null;

  function sameDay(a, b) {
    return a && b && a.getTime() === b.getTime();
  }

  function formatDate(d) {
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日（' + WEEK[d.getDay()] + '）';
  }

  function render() {
    var year = view.getFullYear();
    var month = view.getMonth();
    monthLabel.textContent = year + '年 ' + (month + 1) + '月';
    prevBtn.disabled = year === minDate.getFullYear() && month === minDate.getMonth();
    nextBtn.disabled = year === maxDate.getFullYear() && month === maxDate.getMonth();

    grid.innerHTML = '';
    var firstDay = new Date(year, month, 1).getDay();
    var days = new Date(year, month + 1, 0).getDate();

    for (var i = 0; i < firstDay; i++) {
      grid.appendChild(document.createElement('span'));
    }

    for (var day = 1; day <= days; day++) {
      var date = new Date(year, month, day);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar__day';
      btn.textContent = day;
      btn.setAttribute('aria-label', formatDate(date));
      if (date.getDay() === 0) btn.classList.add('is-sun');
      if (date.getDay() === 6) btn.classList.add('is-sat');
      if (sameDay(date, today)) btn.classList.add('is-today');

      var unavailable = date < minDate || date > maxDate || CLOSED_WEEKDAYS.indexOf(date.getDay()) !== -1;
      if (unavailable) {
        btn.disabled = true;
      } else {
        btn.setAttribute('aria-pressed', String(sameDay(date, selected)));
        btn.addEventListener('click', selectDate.bind(null, date));
      }
      grid.appendChild(btn);
    }
  }

  function selectDate(date) {
    selected = date;
    dateInput.value = formatDate(date);
    selectedLabel.textContent = 'ご希望日：' + formatDate(date);
    selectedLabel.classList.add('is-selected');
    setError('date', false);
    render();
  }

  prevBtn.addEventListener('click', function () {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    render();
  });
  nextBtn.addEventListener('click', function () {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    render();
  });

  render();

  /* ---------- 入力チェック ---------- */
  function setError(name, show) {
    var el = form.querySelector('[data-error-for="' + name + '"]');
    if (el) el.classList.toggle('is-show', show);
    var field = form.elements[name];
    if (field && field.classList) field.classList.toggle('is-invalid', show);
  }

  function validate() {
    var ok = true;
    var checks = {
      lesson: !!form.querySelector('input[name="lesson"]:checked'),
      date: !!dateInput.value,
      name: form.elements.name.value.trim() !== '',
      tel: form.elements.tel.checkValidity(),
      email: form.elements.email.checkValidity()
    };
    Object.keys(checks).forEach(function (key) {
      setError(key, !checks[key]);
      if (!checks[key]) ok = false;
    });
    return ok;
  }

  ['name', 'tel', 'email'].forEach(function (key) {
    form.elements[key].addEventListener('input', function () { setError(key, false); });
  });
  form.querySelectorAll('input[name="lesson"]').forEach(function (r) {
    r.addEventListener('change', function () { setError('lesson', false); });
  });

  /* ---------- 確認画面（送信先が決まるまではここで止める） ---------- */
  var confirmBox = document.getElementById('reserveConfirm');
  var summary = document.getElementById('reserveSummary');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector('.field__error.is-show');
      if (first) first.closest('.field').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var rows = [
      ['体験の種類', form.querySelector('input[name="lesson"]:checked').value],
      ['ご希望日', dateInput.value],
      ['お名前', form.elements.name.value.trim()],
      ['電話番号', form.elements.tel.value.trim()],
      ['メールアドレス', form.elements.email.value.trim()]
    ];
    summary.innerHTML = '';
    rows.forEach(function (row) {
      var dt = document.createElement('dt');
      var dd = document.createElement('dd');
      dt.textContent = row[0];
      dd.textContent = row[1];
      summary.appendChild(dt);
      summary.appendChild(dd);
    });

    form.hidden = true;
    confirmBox.hidden = false;
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('reserveBack').addEventListener('click', function () {
    confirmBox.hidden = true;
    form.hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
