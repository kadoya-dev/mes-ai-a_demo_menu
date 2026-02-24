document.addEventListener("DOMContentLoaded", () => {
  const styleMonthlyComparisonChips = () => {
    const monthlyComparisons = Array.from(document.querySelectorAll('.monthly-panel .metric-item small'));

    monthlyComparisons.forEach((chip) => {
      const raw = (chip.textContent ?? '').trim();
      const isDown = raw.includes('-') || raw.includes('−');

      chip.classList.add('mom-chip');
      chip.classList.toggle('mom-up', !isDown);
      chip.classList.toggle('mom-down', isDown);
    });
  };


  const addMiniTowersToTargetCards = () => {
    const targetCards = Array.from(document.querySelectorAll('.metric-item.target'));

    targetCards.forEach((card) => {
      const percentText = card.querySelector('p')?.textContent ?? '0%';
      const rate = Number.parseInt(percentText.replace(/[^0-9]/g, ''), 10) || 0;
      const miniCoinSlots = 18;
      const activeCoins = Math.max(1, Math.min(miniCoinSlots, Math.round((Math.min(rate, 100) / 100) * miniCoinSlots)));
      const panelId = card.closest('section.panel')?.id ?? '';

      if (panelId) {
        card.classList.add(`period-${panelId}`);
      }


      const miniTower = document.createElement('div');
      miniTower.className = 'mini-target-tower';
      miniTower.setAttribute('aria-hidden', 'true');

      for (let i = 0; i < miniCoinSlots; i += 1) {
        const slot = document.createElement('div');
        slot.className = 'mini-coin-slot';

        const ghostCoin = document.createElement('div');
        ghostCoin.className = 'mini-ghost-coin';
        slot.appendChild(ghostCoin);

        if (i < activeCoins) {
          const coin = document.createElement('div');
          coin.className = 'mini-coin';
          slot.appendChild(coin);
        }

        miniTower.appendChild(slot);
      }

      card.appendChild(miniTower);
    });
  };


  const initSidebarAccordion = () => {
    const menuButton = document.querySelector('.sidebar-title');

    if (!menuButton) {
      return;
    }

    menuButton.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  };

  styleMonthlyComparisonChips();
  addMiniTowersToTargetCards();
  initSidebarAccordion();
});
