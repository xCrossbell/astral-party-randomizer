const maps = [
  "梦想号", "水乡古镇", "魔法学院",
  "龙宫A", "龙宫B", "幽魂", "御魂庆典"
];

const characters = [
  "帕露南", "芬妮", "阿兰娜", "小町", "派德曼", "帕帕拉", "恋", "米米",
  "Z3000", "潘大猛", "璐璐", "枫", "蓝海晴", "美咲", "娜蒂斯", "茉莉",
  "阿尔", "星魅琉华", "南希露", "凛", "梅加斯", "姬梦朝", "照", "超天",
  "主播女孩", "吉尔·斯汀雷", "多萝西·海兹"
];

let currentMap = "";
let currentChars = [];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAll() {
  currentMap = randomChoice(maps);
  currentChars = [];
  const available = [...characters];
  for (let i = 0; i < 8; i++) {
    const pick = available.splice(Math.floor(Math.random() * available.length), 1)[0];
    currentChars.push(pick);
  }
  updateDisplay();
}

function rerollChar(index) {
  const available = characters.filter(c => !currentChars.includes(c));
  if (available.length === 0) return;
  const newChar = randomChoice(available);
  currentChars[index] = newChar;
  updateDisplay();
}

function updateDisplay() {
  const result = document.getElementById("result");
  result.textContent = `🎲 本局地图：${currentMap}\n\n🎯 本局角色池：`;

  const grid = document.getElementById("imageGrid");
  grid.innerHTML = "";
  currentChars.forEach((char, i) => {
    const div = document.createElement("div");
    div.className = "char-box";
    div.innerHTML = `
      <img src="images/${char}.png" alt="${char}">
      <div class="char-name">${char}</div>
    `;
    div.onclick = () => rerollChar(i);
    grid.appendChild(div);
  });
}

// ✅ 确保脚本在页面加载完成后绑定事件
document.addEventListener("DOMContentLoaded", () => {
  const rollButton = document.getElementById("rollAll");
  rollButton.addEventListener("click", randomAll);
});
