import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const dinosaur = document.getElementById("dino");
const score = document.getElementById("score");
const gameoverText = document.getElementById("gameover");

// 背景のスクロール
gsap.to(".map_layer", {
  xPercent: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+2000",
    onUpdate: () => {
      dino_run();
    }
  }
});

// 雲のスクロール
gsap.to(".cloud_layer", {
  xPercent: -40,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+2000",
  }
});

// 恐竜のジャンプ
// 1回目のジャンプ
gsap.to(".dinosaur", {
  y: -130,
  ease: "Power3.inOut",
  scrollTrigger: {
    trigger: ".game_layer",
    scrub: 1,
    start: "+250",
    end : "+300",
    toggleClass: {
      targets: ".dinosaur",
      className: "jump"
    },
  }
});
gsap.fromTo(".dinosaur", {
    y: -130,
  },
  {
    y: 0,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+300",
      end: "+350",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    }
  }
);
// 2回目のジャンプ
gsap.fromTo(".dinosaur", {
    y: 0,
  },
  {
    y: -130,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+560",
      end: "+610",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    }
  }
);
gsap.fromTo(".dinosaur", {
    y: -130,
  },
  {
    y: 0,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+610",
      end: "+660",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    }
  }
);
// 3回目のジャンプ
gsap.fromTo(".dinosaur", {
    y: 0,
  },
  {
    y: -130,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+890",
      end: "+940",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    }
  }
);
gsap.fromTo(".dinosaur", {
    y: -130,
  },
  {
    y: 0,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+940",
      end: "+990",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    }
  }
);
// 4回目のジャンプ
gsap.fromTo(".dinosaur", {
    y: 0,
  },
  {
    y: -80,
    ease: "Power3.inOut",
    scrollTrigger: {
      trigger: ".game_layer",
      scrub: 1,
      start: "+1170",
      end: "+1220",
      toggleClass: {
        targets: ".dinosaur",
        className: "jump"
      },
    },
    onComplete: () => {
      gameover()
    }
  }
);
gsap.set(".dinosaur", {
  y: 0,
});

// 恐竜の足ジタバタ
// スコア上げ下げ
function dino_run() {
  dinosaur.classList.toggle("run");
  score.textContent = window.scrollY;
}

// ゲームオーバー
function gameover() {
  dinosaur.classList.add("death");
  gameoverText.classList.add("is-active");
  reset();
};

// ゲームオーバー復帰
function reset() {
  setTimeout(
    function () {
      dinosaur.classList.remove("death");
      gameoverText.classList.remove("is-active");
    },
    "2000"
  );
};
