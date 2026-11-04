const TITLES = [
  [95, "伝説の推し活マスター👑"],
  [80, "全通レベルの愛の戦士⚔️"],
  [60, "毎日推しに感謝する民🙏"],
  [40, "じわじわ沼に浸かり中🛁"],
  [0,  "推し活ビギナー🌱"],
];
const MSGS = [
  "推しの存在がもう生活インフラ。",
  "推しの誕生日はもはや国民の祝日。",
  "推しを語りだすと3時間は止まらない。",
  "推しのグッズで部屋の8割が埋まっている。",
  "推しが笑うだけで今日も生きられる。",
];
// 同じ名前なら毎回同じ結果になるように、文字列からスコアを作る
function hash(s){ let h=0; for(const c of s){ h=(h*31+c.codePointAt(0))>>>0; } return h; }

document.getElementById("go").onclick = () => {
  const oshi = document.getElementById("oshi").value.trim();
  const me = document.getElementById("me").value.trim() || "あなた";
  if(!oshi){ alert("推しの名前を入れてね！"); return; }
  const h = hash(oshi + "💖" + me);
  const score = h % 101;
  const title = TITLES.find(t => score >= t[0])[1];
  const msg = MSGS[h % MSGS.length];
  document.getElementById("level").textContent = score + "%";
  document.getElementById("title").textContent = title;
  document.getElementById("msg").textContent = `${me}の「${oshi}」への愛… ${msg}`;
  const text = `${me}の「${oshi}」への推し愛レベルは${score}%！【${title}】 #いい推しの日 #推し愛レベル診断`;
  document.getElementById("share").href =
    "https://x.com/intent/post?text=" + encodeURIComponent(text + " " + location.href);
  document.getElementById("result").hidden = false;
};

// ===== 演出：スコアのカウントアップ ＆ ハートが降る =====
const _orig = document.getElementById("go").onclick;
document.getElementById("go").onclick = () => {
  _orig();
  const el = document.getElementById("level");
  const target = parseInt(el.textContent); if(isNaN(target)) return;
  let n = 0;
  const timer = setInterval(() => {
    n = Math.min(target, n + 2); el.textContent = n + "%";
    if(n >= target) clearInterval(timer);
  }, 20);
  for(let i=0;i<30;i++){
    const s = document.createElement("span");
    s.textContent = ["💖","💕","✨","🌟"][i%4];
    s.style.cssText = `position:fixed;top:-40px;left:${Math.random()*100}vw;font-size:${20+Math.random()*24}px;transition:top 2.5s ease-in,opacity 2.5s;`;
    document.body.appendChild(s);
    setTimeout(()=>{ s.style.top="110vh"; s.style.opacity="0"; }, 50+i*40);
    setTimeout(()=>s.remove(), 4000);
  }
};
