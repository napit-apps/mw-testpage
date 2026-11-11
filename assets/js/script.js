(function ($) {
  'use strict';

  // global variables

  var win = $(window);

  // navigation fixed top
  win.on('scroll', function () {
    if ($(window).scrollTop() > 70) {
      $('.main-nav').addClass('nav-top');
    } else {
      $('.main-nav').removeClass('nav-top');
    }
  });


  $(".toggler").click(function () {
    $(".full-nav").toggleClass("show");
  });


  // clients slider
  $('.clients-wrap').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    dots: false,
    arrows: false,
    center: true,
    autoplay: true,
    padding: 20,
    autoplaySpeed: 2000,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }

    ]
  });


  // testimonial slider
  $('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [{
      breakpoint: 900,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }]
  });


  // testimonial slider 2
  $('.testimonial-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    nextArrow: '<button class="slide-arrow prev-arrow"><i class="ti-arrow-right"></i></button>',
    prevArrow: '<button class="slide-arrow next-arrow"><i class="ti-arrow-left"></i></button>',
    autoplay: true,
    autoplaySpeed: 6000
  });


  // magnific popup
  $('.portfolio-gallery').each(function () {
    $(this).find('.popup-gallery').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

  $(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });

  $(document).ready(function() {
    $('.more-info-link').magnificPopup({
      type: 'inline',
      midClick: true,
      mainClass: 'mfp-fade',
      removalDelay: 300,
      // no need for custom callbacks to modify content,
      // Magnific Popup handles it based on `data-mfp-src` attribute
    });
  });



  // win.on('load', function () { // makes sure the whole site is loaded

  //   // ----------------------- 
  //   // Progress Bar--------------------
  //   // 
  //   $('.progress-bar').each(function () {
  //     var width = $(this).data('percent');
  //     $(this).css({
  //       'transition': 'width 3s'
  //     });
  //     $(this).appear(function () {
  //       $(this).css('width', width + '%');
  //       $(this).find('.skill-number').countTo({
  //         from: 0,
  //         to: width,
  //         speed: 3000,
  //         refreshInterval: 50
  //       });
  //     });
  //   });
  // }); //End On Load Function



  // search box
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // Shuffle js filter and masonry
  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    $('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  // FAQ Toggle Functionality
  // $(document).ready(function () {
  //   $('.faq-question').on('click', function () {
  //     var answerRow = $(this).next('.faq-answer');
  //     answerRow.toggleClass('open');
  //   });
  // });
  $(document).ready(function () {
    $('.faq-question').click(function () {
      // This assumes the answer is the immediately following row
      var answer = $(this).next('.faq-answer');
      answer.slideToggle(0, function() {
        answer.toggleClass('open');
      });
      $(this).toggleClass('open');
    });
  });

  // meta social link

  $('.share-btn').on('click', function (e) {
    e.preventDefault();
    $('.meta-share .social-links').toggleClass('open');

  });

  $('div').slice(0, 6).show(); // select the first ten
  $('#load').click(function (e) { // click event for load more
    e.preventDefault();
    $('div:hidden').slice(0, 3).show(); // select next 10 hidden divs and show them
    if ($('div:hidden').length === 0) { // check if any hidden divs still exist
      alert('No more divs'); // alert if there are none left
    }
  });

  function normalizeQuery(str) {
    return str.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function snippetFromContent(post, query, snippetLength) {
    if (!post.content) {
      return post.excerpt || '';
    }

    var text = post.content;
    var qTerms = normalizeQuery(query).split(' ').filter(Boolean);
    var firstMatch = -1;
    var matchWord = '';

    qTerms.forEach(function (term) {
      var idx = text.toLowerCase().indexOf(term);
      if (idx >= 0 && (firstMatch < 0 || idx < firstMatch)) {
        firstMatch = idx;
        matchWord = term;
      }
    });

    if (firstMatch < 0) {
      return text.substr(0, snippetLength) + (text.length > snippetLength ? '…' : '');
    }

    var heading = '';
    var beforeMatch = text.slice(0, firstMatch);
    var headingMatches = beforeMatch.match(/(^|\n)#{1,6}\s*(.+?)(\n|$)/g);
    if (headingMatches && headingMatches.length) {
      heading = headingMatches[headingMatches.length - 1].replace(/(^|\n)#{1,6}\s*/, '').trim();
    }

    var start = Math.max(0, firstMatch - Math.floor(snippetLength / 2));
    var end = Math.min(text.length, start + snippetLength);
    var snippet = text.substring(start, end).trim();

    var highlight = (heading ? heading + ': ' : '') + snippet;
    if (matchWord) {
      var regex = new RegExp('(' + qTerms.join('|') + ')', 'gi');
      highlight = highlight.replace(regex, '<mark>$1</mark>');
    }

    return highlight + (end < text.length ? ' …' : '');
  }

  function renderSearchResults(results, indexData, query, maxResults) {
    var container = document.getElementById('blog-search-results');
    var noResults = document.getElementById('blog-search-no-results');
    var overlay = document.getElementById('blog-search-overlay');

    container.innerHTML = '';

    if (!results.length) {
      noResults.classList.remove('d-none');
      overlay.classList.remove('d-none');
      return;
    }

    noResults.classList.add('d-none');
    overlay.classList.remove('d-none');

    results.slice(0, maxResults).forEach(function (hit) {
      var item = indexData.find(function (p) {
        return p.url === hit.ref;
      });

      if (!item) {
        return;
      }

      var snippet = snippetFromContent(item, query, window.searchConfig.snippet_length || 180);

      var row = document.createElement('a');
      row.href = item.url;
      row.className = 'search-result-item';
      row.style.display = 'flex';
      row.style.flexDirection = 'column';
      row.style.gap = '6px';
      row.innerHTML =
        '<div style="display: flex; justify-content: space-between; align-items: flex-start;">' +
          '<div class="search-result-left">' +
            '<div class="fw-bold">' + item.title + '</div>' +
            '<div class="text-muted">' + (item.author || '') + ' ' + (item.date ? '- ' + item.date : '') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="search-result-snippet">' + snippet + '</div>';

      row.addEventListener('click', function() {
        overlay.classList.add('d-none');
      });

      container.appendChild(row);
    });
  }

  if (document.getElementById('blog-search-input')) {
    window.searchConfig = window.searchConfig || {};

    if (window.site && window.site.search) {
      window.searchConfig = Object.assign({}, window.site.search, window.searchConfig);
    }

    var lang = (document.documentElement.lang || (window.site && window.site.lang) || 'de').toLowerCase();
    var localePrefix = (lang === 'en' ? '/en' : '');

    function localizePath(p) {
      if (!p || typeof p !== 'string') return p;
      if (p.match(/^https?:\/\//)) return p;
      if (p.charAt(0) === '/') {
        return p;
      }
      return (localePrefix + '/' + p).replace(/\/\/+/, '/');
    }

    var indexUrl = localizePath(window.searchConfig.fallback_json || 'search.json');
    if (lang === 'en' && window.searchConfig.en_json) {
      indexUrl = localizePath(window.searchConfig.en_json);
    } else if (lang === 'de' && window.searchConfig.de_json) {
      indexUrl = localizePath(window.searchConfig.de_json);
    }

    function initializeIndex(data) {
      window.searchIndexData = (data || []);

      var pageIndex = lunr(function () {
        this.ref('url');
        this.field('title', { boost: window.searchConfig.field_weights.title || 10 });
        this.field('author', { boost: window.searchConfig.field_weights.author || 5 });
        this.field('tags', { boost: window.searchConfig.field_weights.tags || 5 });
        this.field('content', { boost: window.searchConfig.field_weights.content || 1 });

        window.searchIndexData.forEach(function (doc) {
          if (!window.searchConfig.use_language_index || !doc.lang || doc.lang === lang) {
            this.add(doc);
          }
        }, this);
      });

      var searchInput = document.getElementById('blog-search-input');
      var clearBtn = document.getElementById('blog-search-clear');
      var rh = null;

      // Ensure overlay is hidden on page load
      document.getElementById('blog-search-overlay').classList.add('d-none');

      function updateClearBtn() {
        if (searchInput.value.length > 0) {
          clearBtn.classList.remove('d-none');
        } else {
          clearBtn.classList.add('d-none');
        }
      }

      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchInput.value = '';
        updateClearBtn();
        document.getElementById('blog-search-overlay').classList.add('d-none');
        searchInput.focus();
      });

      searchInput.addEventListener('input', function (e) {
        updateClearBtn();

        if (rh) {
          clearTimeout(rh);
        }

        rh = setTimeout(function () {
          var query = normalizeQuery(e.target.value);
          var minLen = window.searchConfig.min_query_length || 3;

          if (query.length < minLen) {
            document.getElementById('blog-search-overlay').classList.add('d-none');
            return;
          }

          var tokens = query.split(' ').filter(Boolean);
          if (!tokens.length) {
            document.getElementById('blog-search-overlay').classList.add('d-none');
            return;
          }

          var searchTerms = tokens.map(function (t) {
            var escaped = t.replace(/[\^~:\/\?\*\+\-\(\)\{\}\[\]\"\']/g, '\\$&');
            return escaped + '*';
          });

          var results;
          try {
            results = pageIndex.search(searchTerms.join(' '));
          } catch (err) {
            results = [];
          }

          renderSearchResults(results, window.searchIndexData, query, window.searchConfig.max_results || 20);
        }, 220);
      });

      searchInput.addEventListener('focus', function (e) {
        var query = normalizeQuery(searchInput.value);
        var minLen = window.searchConfig.min_query_length || 3;

        if (query.length >= minLen) {
          var tokens = query.split(' ').filter(Boolean);
          if (tokens.length > 0) {
            var searchTerms = tokens.map(function (t) {
              var escaped = t.replace(/[\^~:\/\?\*\+\-\(\)\{\}\[\]\"\']/g, '\\$&');
              return escaped + '*';
            });

            var results;
            try {
              results = pageIndex.search(searchTerms.join(' '));
            } catch (err) {
              results = [];
            }

            renderSearchResults(results, window.searchIndexData, query, window.searchConfig.max_results || 20);
          }
        }
      });

      document.addEventListener('click', function (event) {
        var overlay = document.getElementById('blog-search-overlay');
        var target = event.target;
        if (!document.getElementById('blog-search-wrapper').contains(target)) {
          overlay.classList.add('d-none');
        }
      });
    }

    function loadIndex(url, fallbackUrl) {
      fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Search index not available: ' + url);
          }
          return response.json();
        })
        .then(function (data) {
          if ((!data || data.length === 0) && fallbackUrl) {
            return loadIndex(fallbackUrl, null);
          }
          initializeIndex(data || []);
        })
        .catch(function (err) {
          console.warn('Search index fetch failed (trying fallback):', err);
          if (fallbackUrl) {
            loadIndex(fallbackUrl, null);
          } else {
            console.error('Search initialization failed:', err);
          }
        });
    }

    loadIndex(indexUrl, window.searchConfig.fallback_json && indexUrl !== window.searchConfig.fallback_json ? window.searchConfig.fallback_json : null);
  }

})(jQuery);