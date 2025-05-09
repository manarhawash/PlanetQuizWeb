// قائمة الأسئلة مع الخيارات وفهرس الإجابة الصحيحة
const quiz = [
  {
    text: "ما هو أقرب كوكب إلى الشمس؟",
    options: ["الأرض","عطارد","المشتري","زحل"],
    correct: 1
  },
  {
    text: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    options: ["زحل","نبتون","المشتري","المريخ"],
    correct: 2
  },
  {
    text: "أي كوكب يعرف بالكوكب الأحمر؟",
    options: ["الزهرة","نبتون","عطارد","المريخ"],
    correct: 3
  },
  {
    text: "أي كوكب له حلقات واضحة؟",
    options: ["زحل","الأرض","المريخ","الزهرة"],
    correct: 0
  },
  {
    text: "أي كوكب أبعد عن الشمس؟",
    options: ["أورانوس","نبتون","زحل","الأرض"],
    correct: 1
  }
];

let currentQuestion = 0;

// دوال مساعد لتحميل السؤال الحالي
function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById('question').textContent = q.text;
  q.options.forEach((opt, i) => {
    document.getElementById(`opt${i}`).textContent = opt;
  });
  // إعادة الضبط
  document.querySelectorAll('input[name="option"]').forEach(r => r.checked = false);
  document.getElementById('feedback').textContent = '';
  // تحديث نص الزر
  const btn = document.getElementById('btnNext');
  btn.textContent = currentQuestion < quiz.length - 1 ? 'التالي →' : 'إنهاء';
}

// عند الضغط على الزر
document.getElementById('btnNext').addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('يرجى اختيار إجابة!');
    return;
  }
  const answer = parseInt(selected.value, 10);
  const feedback = document.getElementById('feedback');
  if (answer === quiz[currentQuestion].correct) {
    feedback.textContent = '✅ إجابة صحيحة!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = '❌ إجابة خاطئة.';
    feedback.style.color = 'red';
  }
  // بعد ثانية انتقل للسؤال التالي
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      loadQuestion();
    } else {
      document.getElementById('question').textContent = 'انتهت الأسئلة! ✅';
      document.querySelector('.options').remove();
      document.getElementById('btnNext').disabled = true;
      feedback.textContent = '';
    }
  }, 1000);
});

// بدء اللعبة
loadQuestion();
