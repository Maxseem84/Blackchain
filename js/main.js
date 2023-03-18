$(function () {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  wow = new WOW({
    mobile: false,
  });
  wow.init();

  if (document.querySelector('#open-wallet-password')) {
    const openWalletPassword = document.querySelector('#open-wallet-password');
    const openWalletBtn = document.querySelector('#open-wallet-btn');
    openWalletPassword.addEventListener('keyup', (event) => {
      if (event.target.value.length > 5) {
        openWalletBtn.classList.remove('is-disabled');
      } else {
        openWalletBtn.classList.add('is-disabled');
      }
    });

    const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^\w\s])/g;
    openWalletBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const password = openWalletPassword.value;
      if (password.match(passwordPattern)) {
        $.fancybox.open($('#code-words'), {
          touch: false,
          autoFocus: false,
        });
      } else {
        $.fancybox.open($('#password-error'), {
          touch: false,
          autoFocus: false,
        });
      }
    });
  }

  if (document.querySelector('.code-words__btns')) {
    const words = [
      { id: '01', value: 'april' },
      { id: '02', value: 'upon' },
      { id: '03', value: 'cayote' },
      { id: '04', value: 'snow' },
      { id: '05', value: 'danger' },
      { id: '06', value: 'plug' },
      { id: '07', value: 'deposit' },
      { id: '08', value: 'ridge' },
      { id: '09', value: 'discover' },
      { id: '10', value: 'urban' },
      { id: '11', value: 'flavor' },
      { id: '12', value: 'exchange' },
    ];

    const randomWords = words.sort(() => Math.random() - 0.5);

    const wordsHTML = randomWords.map((word) => {
      return `<div class="code-word"><button id="${word.id}" class="btn code-word__btn">${word.value}</button></div>`;
    });

    document.querySelector('.code-words__btns').innerHTML = wordsHTML.join('');

    const wordsBtns = document.querySelectorAll('.code-word__btn');
    const wordsBtnsArray = Array.from(wordsBtns);
    const wordsBtn = document.querySelector('#code-words-btn');

    wordsBtnsArray.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains('is-active')) {
          target.classList.add('is-active');
        } else {
          target.classList.remove('is-active');
        }
        const wordsBtnsL = document.querySelectorAll('.code-word__btn.is-active').length;
        if (wordsBtnsL === wordsBtnsArray.length) {
          wordsBtn.classList.remove('is-disabled');
        } else {
          wordsBtn.classList.add('is-disabled');
        }
      });
    });
  }

  if (document.querySelector('.wallet')) {
    const coinsProcents = document.querySelectorAll('.coin-procent');
    const coinsProcentsArray = Array.from(coinsProcents);
    coinsProcentsArray.forEach((item) => {
      if (Number(item.querySelector('.coin-procent__text').innerText) < 0) {
        item.classList.add('is-red');
      } else {
        item.classList.add('is-green');
      }
    });

    //Calc Balance

    const totalBalanceEl = document.querySelector('#wallet-balance-total');
    const coinsValues = document.querySelectorAll('.coin-value__text');
    const coinsValuesArray = Array.from(coinsValues);
    const totalBalance = coinsValuesArray.reduce(
      (sum, coin) => parseFloat(coin.innerText.replace(/ +/g, '')) + sum,
      0,
    );
    totalBalanceEl.innerHTML = totalBalance
      .toFixed(2)
      .toString()
      .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');

    //Coin Info Popup

    const coins = document.querySelector('.coins');
    const coinPopups = document.querySelectorAll('.coin');
    const coinPopupsArray = Array.from(coinPopups);
    const coinPopup = document.querySelector('#coin-popup');
    const coinPopupTitle = coinPopup.querySelector('.coin-popup__title');
    const coinPopupIcon = coinPopup.querySelector('.popup__icon');

    coinPopupsArray.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const title = link.querySelector('.coin__title').innerText;
        const icon = link.querySelector('.coin__icon').src;
        coinPopupTitle.innerText = title;
        coinPopupIcon.src = icon;
        coins.classList.add('is-hidden');
        coinPopup.classList.add('is-visible');
        setTimeout(() => {
          coinPopup.classList.add('is-fadein');
        }, 100);
        window.scrollTo(0, 0);
      });
    });

    const coinPopupClose = document.querySelector('#coin-popup-close');
    coinPopupClose.addEventListener('click', (event) => {
      event.preventDefault();
      coins.classList.remove('is-hidden');
      coinPopup.classList.remove('is-visible', 'is-fadein');
    });

    //Popups Withdrawal, Stake & Unstake

    const popupBtn = document.querySelectorAll('.open-next-popup');
    const popupBtnArray = Array.from(popupBtn);
    const popupCoinTitle = document.querySelectorAll('.popup__coin-title');
    const popupCoinTitleArray = Array.from(popupCoinTitle);
    const popupCoinIcon = document.querySelectorAll('.popup__icon');
    const popupCoinIconArray = Array.from(popupCoinIcon);

    popupBtnArray.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        popupCoinTitleArray.forEach((title) => {
          title.innerText = coinPopupTitle.innerText;
        });
        popupCoinIconArray.forEach((icon) => {
          icon.src = coinPopupIcon.src;
        });
        const href = btn.getAttribute('data-href');
        const popup = document.querySelector(href);
        coinPopup.classList.remove('is-visible', 'is-fadein');
        popup.classList.add('is-visible');
        setTimeout(() => {
          popup.classList.add('is-fadein');
        }, 100);
        window.scrollTo(0, 0);
      });
    });

    const nextPopupClose = document.querySelectorAll('.next-popup-close');
    const nextPopupCloseArray = Array.from(nextPopupClose);
    nextPopupCloseArray.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const popup = item.closest('.popup');
        popup.classList.remove('is-visible', 'is-fadein');
        coinPopup.classList.add('is-visible');
        setTimeout(() => {
          coinPopup.classList.add('is-fadein');
        }, 100);
        window.scrollTo(0, 0);
      });
    });
  }

  $(
    '[data-href="#withdrawal-popup-success"], [data-href="#stake-popup-success"], [data-href="#unstake-popup-success"]',
  ).click(function (event) {
    event.preventDefault();
    var href = $(this).data('href');
    $.fancybox.open($(href), {
      touch: false,
      autoFocus: false,
    });
  });

  $('.popup__close, .popup-success__close').click(function (event) {
    event.preventDefault();
    $.fancybox.close();
  });

  //Chrome Smooth Scroll
  try {
    $.browserSelector();
    if ($('html').hasClass('chrome')) {
      $.smoothScroll();
    }
  } catch (err) {}

  $('img, a').on('dragstart', function (event) {
    event.preventDefault();
  });
});

window.addEventListener('load', () => {
  if (document.querySelector('.preloader')) {
    setTimeout(() => {
      document.querySelector('.preloader').classList.add('is-hidden');
      window.scrollTo(0, 0);
    }, 1000);
  }
});
