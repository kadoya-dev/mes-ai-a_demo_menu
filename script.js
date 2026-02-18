document.addEventListener("DOMContentLoaded", () => {
  const salesTowerConfig = [
    { id: "daily", target: 500000, current: 410000, maxCoins: 28 },
    { id: "weekly", target: 3200000, current: 2884000, maxCoins: 28 },
    { id: "monthly", target: 12300000, current: 12460000, maxCoins: 28 },
  ];

  const formatYen = (value) => `¥${value.toLocaleString("ja-JP")}`;

  const createTower = (item) => {
    const container = document.getElementById(`tower-${item.id}`);
    const targetElem = document.getElementById(`target-${item.id}`);
    const currentElem = document.getElementById(`current-${item.id}`);
    const rateElem = document.getElementById(`rate-${item.id}`);
    const overElem = document.getElementById(`over-${item.id}`);

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

  salesTowerConfig.forEach(createTower);
});
