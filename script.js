const quiz = [
  {
    word: "argue",
    choices: ["もがく", "依存する", "と主張する", "身体を動かす"],
    answer: 2
  },
  {
    word: "degree",
    choices: ["学位", "中の", "蔑む", "反対"],
    answer: 0
  },
  {
    word: "appreciate",
    choices: ["適合する", "を感謝する", "小さな", "モバイルの"],
    answer: 1
  },
  {
    word: "disappoint",
    choices: ["無視する", "負ける", "を失望させる", "放置する"],
    answer: 2
  },
  {
    word: "rather",
    choices: ["なかなか", "革の", "いやはや", "かなり"],
    answer: 3
  },
  {
    word: "suffer",
    choices: ["渋い", "サーファー", "苦しむ", "楽観的な"],
    answer: 2
  },
  {
    word: "store",
    choices: ["を蓄える", "止まる", "暖かい", "を落とす"],
    answer: 0
  },
  {
    word: "allow",
    choices: ["混んでいる", "弓", "矢", "を許す"],
    answer: 3
  },
  {
    word: "crop",
    choices: ["面積", "カエル", "作物", "坂"],
    answer: 2
  },
  {
    word: "overtime",
    choices: ["久しぶりに", "時間外に", "未来に", "時を超えて"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let answered = false;

// ★ 追加：開始時間と終了時間
let startTime;
let endTime;

const question = document.getElementById("question");
const buttons = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuiz() {
  // 最初の問題が読み込まれたときに時間計測開始
  if (current === 0) {
    startTime = new Date();
  }

  result.innerText = "";
  answered = false;

  question.innerText = quiz[current].word;
  questionNumber.innerText = `第 ${current + 1} 問 / ${quiz.length} 問`;

  buttons.forEach((btn, index) => {
    btn.innerText = quiz[current].choices[index];
    btn.disabled = false;
  });
}

function checkAnswer(index) {
  answered = true;
  buttons.forEach(btn => btn.disabled = true);

  if (index === quiz[current].answer) {
    result.innerText = "⭕ 正解！";
    score++;
  } else {
    result.innerText = "✖️ 不正解！";
  }
}

function nextQuestion() {

  // ★ 未回答のとき確認する
  if (!answered) {
    const goNext = confirm("まだ回答していません。本当に次の問題に進みますか？");

    if (!goNext) {
      return;
    }

    result.innerText = "✖️ 未回答";
  }

  current++;

  if (current >= quiz.length) {
    endTime = new Date();
    showResult();
    return;
  }

  loadQuiz();
}

function showResult() {
  const timeDiff = Math.floor((endTime - startTime) / 1000); // 秒
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;

  question.innerText = "クイズ終了！";
  questionNumber.innerText = "";
  document.getElementById("choices").style.display = "none";

  result.innerText =
    `あなたの結果：${quiz.length} 問中 ${score} 問正解 🎉\n` +
    `所要時間：${minutes} 分 ${seconds} 秒`;

  document.getElementById("nextBtn").style.display = "none";
}

loadQuiz();
