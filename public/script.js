const floatingsquares = [];

window.addEventListener('DOMContentLoaded', () => {
  console.log("script running");

  if (typeof submittedWebsite !== 'undefined') {
    const year = "2015";
    const apiURL = `https://archive.org/wayback/available?url=${encodeURIComponent(submittedWebsite)}&timestamp=${year}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        const snapshot = data.archived_snapshots?.closest;
        if (snapshot && snapshot.available) {
          console.log("Archived version found:", snapshot.url);
          window.location.href = snapshot.url;
        } else {
          alert("No archived version found.");
        }
      })
      .catch(err => {
        console.error("Wayback error:", err);
        alert("Something went wrong with the Wayback Machine.");
      });
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getRandomPosition() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y };
  }

  function spawnThing() {
    const { x, y } = getRandomPosition();
    const el = document.createElement('div');
    el.classList.add('spawn');
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const rotation = Math.floor(Math.random() * 360);
    el.style.transform = `rotate(${rotation}deg)`;

    document.body.appendChild(el);
    console.log("new spawn");

    const vx = (Math.random() * 2) - 1;
    const vy = (Math.random() * 2) - 1;

    floatingsquares.push({ el, x, y, vx, vy });

    setTimeout(() => {
      el.remove();
      const index = floatingsquares.findIndex(obj => obj.el === el);
      if (index > -1) floatingsquares.splice(index, 1);
    }, 20000);
  }

  function animate() {
    floatingsquares.forEach(obj => {
      obj.x += obj.vx;
      obj.y += obj.vy;

      if (obj.x <= 0 || obj.x >= window.innerWidth - 30) obj.vx = -obj.vx;
      if (obj.y <= 0 || obj.y >= window.innerHeight - 30) obj.vy = -obj.vy;

      obj.el.style.left = `${obj.x}px`;
      obj.el.style.top = `${obj.y}px`
    });

    requestAnimationFrame(animate);
  }

  async function spawnLoop() {
    const secondswait = 3000
    while (true) {
      spawnThing();
      await wait(secondswait);
    }
  }

  spawnLoop();
  animate();
});