const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

const setActiveTab = (target) => {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === target);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});
