(function() {
  var dot = document.getElementById('dot');
  var number = document.getElementById('number');
  var title = document.getElementById('title');
  var answers = document.getElementById('answers');
  var answerEls = document.querySelectorAll('.answer');
  var questions = [
    {
      flip: true,
      title: 'I dislike joke entries',
      type: 'economic',
    },
    {
      flip: false,
      title: 'Modern-sounding entries place higher in my rankings',
      type: 'social'
    },
    {
      flip: false,
      title: 'I tend to dislike ballad type songs more',
      type: 'economic'
    },
    {
      flip: true,
      title: '2000s Eurovision should be considered a dark age for music',
      type: 'economic'
    },
    {
      flip: false,
      title: 'I believe Eurovisions golden age started in 2015',
      type: 'social'
    },
    {
      flip: false,
      title: 'I still listen to Arcade by Duncan Laurence',
      type: 'economic'
    },
    {
      flip: true,
      title: 'I find simpler songs more enjoyable',
      type: 'social'
    },
   {
      flip: true,
      title: 'I want live orchestra back in Eurovision (Ignoring executional issues)',
      type: 'social'
    },
   {
      flip: true,
      title: 'Countries should send more songs reflecting their culture',
      type: 'economic'
    },
    {
      flip: false,
      title: 'I like "disaster pop" music',
      type: 'social'
    },
    {
      flip: true,
      title: 'I really dislike Norway 2021',
      type: 'economic'
    },
    {
      flip: false,
      title: 'Sweden is one of my favorite Eurovision countries',
      type: 'economic'
    },
    {
      flip: true,
      title: 'Pre-2000s Eurovision is better than post-2000s Eurovision',
      type: 'social'
    },
    {
      flip: false,
      title: 'Gay clubs in Tel Aviv should decide 50% of the final result',
      type: 'economic'
    },
    {
      flip: true,
      title: 'I watch/try to watch Sanremo every year',
      type: 'social'
    },
    {
      flip: false,
      title: 'Vocoders should be allowed in Eurovision',
      type: 'social'
    },
  ];
  var questionNum = 1;

  function setup() {
    window.addEventListener('hashchange', onHash);
    answerEls.forEach(function(answerEl) {
      answerEl.addEventListener('click', onClick);
    });
    onHash();
  }

  function load(num) {
    console.log('questions.load', num);
    var question = questions[num - 1];
    number.innerText = `Question ${num}`;
    title.innerText = question.title;
    questionNum = num;
  }

  function onClick(e) {
    var num = Number(e.target.getAttribute('data-num'));
    console.log('questions.answer', questionNum, '=', num);
    questions[questionNum - 1].answer = num;
    e.target.blur();
    updateChart();
    if (questionNum < questions.length) {
      answers.style.display = 'flex';
      window.location.hash = questionNum + 1;
    } else {
      answers.style.display = 'none';
      number.innerText = `Complete!`;
      title.innerText = 'All questions answered';
    }
  }

  function onHash() {
    var num = Number(window.location.hash.slice(1));
    if (num) {
      load(num);
    } else {
      reset();
      updateChart();
      load(1);
    }
  }

  function reset() {
    answers.style.display = 'flex';
    questions.forEach(function(question) {
      delete question.answer;
    });
    console.log(questions);
  }

  function updateChart() {
    var matches = 0;
    var results = {
      economic: 0,
      social: 0,
    };
    questions.forEach(function(question, index) {
      if (question.answer) {
        if (question.flip) {
          results[question.type] = results[question.type] - question.answer;
        } else {
          results[question.type] = results[question.type] + question.answer;
        }
        if (matches > 0) {
          results[question.type] = results[question.type] / 2;
        }
        matches += 1;
      }
    });
    console.log('results', results);
    dot.style.left = ((results['economic'] + 1) / 2) * 100 + '%';
    dot.style.top = ((results['social'] + 1) / 2) * 100 + '%';
  }

  setup();
}());
