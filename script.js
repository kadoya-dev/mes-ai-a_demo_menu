document.addEventListener("DOMContentLoaded", () => {
  const towerGroups = [
    {
      prefix: "",
      items: [
        { id: "daily", target: 500000, current: 410000, maxCoins: 28 },
        { id: "weekly", target: 3200000, current: 2884000, maxCoins: 28 },
        { id: "monthly", target: 12300000, current: 12460000, maxCoins: 28 },
      ],
    },
    {
      prefix: "profit",
      items: [
        { id: "daily", target: 300000, current: 204000, maxCoins: 28 },
        { id: "weekly", target: 970000, current: 853000, maxCoins: 28 },
        { id: "monthly", target: 3600000, current: 3520000, maxCoins: 28 },
      ],
    },
  ];

  const formatYen = (value) => `¥${value.toLocaleString("ja-JP")}`;

  const domId = (prefix, base, id) => (prefix ? `${prefix}-${base}-${id}` : `${base}-${id}`);

  const createTower = (item, prefix) => {
    const container = document.getElementById(domId(prefix, "tower", item.id));
    const targetElem = document.getElementById(domId(prefix, "target", item.id));
    const currentElem = document.getElementById(domId(prefix, "current", item.id));
    const rateElem = document.getElementById(domId(prefix, "rate", item.id));
    const overElem = document.getElementById(domId(prefix, "over", item.id));

    if (!container || !targetElem || !currentElem || !rateElem || !overElem) {
      return;
    }

    const rate = Math.round((item.current / item.target) * 100);
    const overRate = Math.max(0, rate - 100);
    const activeCount = Math.min(item.maxCoins, Math.round((Math.min(rate, 100) / 100) * item.maxCoins));

    targetElem.textContent = formatYen(item.target);
    currentElem.textContent = formatYen(item.current);
    rateElem.textContent = `${rate}%`;

    if (overRate > 0) {
      overElem.hidden = false;
      overElem.textContent = `達成 +${overRate}%`;
      container.parentElement?.classList.add("over-achieved");
    }

    for (let i = 0; i < item.maxCoins; i += 1) {
      const slot = document.createElement("div");
      slot.classList.add("coin-slot");

      const rx = `${(Math.random() * 12 - 6).toFixed(1)}px`;
      const baseDelay = i * 0.04;

      const ghost = document.createElement("div");
      ghost.classList.add("coin-base", "ghost-coin", "animate");
      ghost.style.setProperty("--rx", rx);
      ghost.style.animationDelay = `${baseDelay + 0.5}s`;
      slot.appendChild(ghost);

      if (i < activeCount) {
        const active = document.createElement("div");
        active.classList.add("coin-base", "active-coin", "animate");
        active.style.setProperty("--rx", rx);
        active.style.animationDelay = `${baseDelay}s`;
        slot.appendChild(active);
      }

      container.appendChild(slot);
    }
  };

  towerGroups.forEach((group) => {
    group.items.forEach((item) => createTower(item, group.prefix));
  });

  const getAchievementRate = (card) => {
    const rateText = card.querySelector("p")?.textContent ?? "0";
    const rate = Number.parseInt(rateText, 10);
    return Number.isNaN(rate) ? 0 : rate;
  };

  const createConfettiBurst = (achievementCount) => {
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    document.body.appendChild(layer);

    const colors = ["#ef4444", "#f59e0b", "#facc15", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];
    const bursts = Math.min(4, Math.max(2, achievementCount + 1));
    const baseCount = 90 + achievementCount * 45;

    for (let burst = 0; burst < bursts; burst += 1) {
      const burstDelay = burst * 180;
      const burstPieces = Math.round(baseCount / bursts);

      window.setTimeout(() => {
        for (let i = 0; i < burstPieces; i += 1) {
          const piece = document.createElement("span");
          piece.className = "confetti-piece";

          const xStart = `${Math.random() * 100}vw`;
          const xDrift = `${(Math.random() * 36 - 18).toFixed(2)}vw`;
          const fallDuration = `${(2.2 + Math.random() * 1.5).toFixed(2)}s`;
          const spin = `${Math.round(Math.random() * 1080 - 540)}deg`;

          piece.style.setProperty("--x-start", xStart);
          piece.style.setProperty("--x-drift", xDrift);
          piece.style.setProperty("--fall-duration", fallDuration);
          piece.style.setProperty("--spin", spin);
          piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          piece.style.borderRadius = Math.random() > 0.5 ? "999px" : "3px";
          piece.style.width = `${6 + Math.random() * 7}px`;
          piece.style.height = `${10 + Math.random() * 10}px`;

          layer.appendChild(piece);
          window.setTimeout(() => piece.remove(), 4200);
        }
      }, burstDelay);
    }

    window.setTimeout(() => layer.remove(), 5200);
  };

  const addCelebrateButtons = () => {
    const targetCards = Array.from(document.querySelectorAll(".metric-item.target"));
    const achievedCards = targetCards.filter((card) => getAchievementRate(card) >= 100);

    achievedCards.forEach((card) => {
      if (card.querySelector(".celebrate-button")) {
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "celebrate-button";
      button.textContent = "🎉 お祝いする";
      button.setAttribute("aria-label", "達成をお祝いする");
      button.addEventListener("click", () => createConfettiBurst(achievedCards.length));
      card.appendChild(button);
    });
  };

  addCelebrateButtons();
});
