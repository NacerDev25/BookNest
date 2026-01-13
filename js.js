const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const headerNavItems = document.querySelectorAll(".bottom-nav li");

let isCloned = false; // هل تم النسخ؟

menuToggle.addEventListener("click", function () {
  const isOpen = sideMenu.getAttribute("aria-hidden") === "false";

  // إذا كانت مغلقة → نفتحها
  if (!isOpen) {

    // ننسخ العناصر مرة واحدة فقط
    if (!isCloned) {
      headerNavItems.forEach(item => {
        const clone = item.cloneNode(true);
        sideMenu.appendChild(clone);
      });
      isCloned = true;
    }

    sideMenu.setAttribute("aria-hidden", "false");

  } else {
    // إذا كانت مفتوحة → نغلقها
    sideMenu.setAttribute("aria-hidden", "true");
  }
});
