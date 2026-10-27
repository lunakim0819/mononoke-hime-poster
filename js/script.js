// 화면 크기에 맞게 포스터 크기 조정
function fitPoster() {
  let s = Math.min(window.innerWidth / 1745, window.innerHeight / 828);
  $(".poster").css({
    transform: "scale(" + s + ")",
    left: (window.innerWidth - 1745 * s) / 2 + "px",
    top: (window.innerHeight - 828 * s) / 2 + "px"
  });
}
fitPoster();
$(window).on("resize", fitPoster);

$(document).ready(function () {

  // 0: 시작 숲
  // 1: 칼을 든 산
  // 2: 아시타카
  // 3: 그대는 아름답다
  // 4: 치료 장면
  // 5: 밝은 숲
  // 6: 마지막 타이틀
  let scene = 0;
  let moving = false;

  // 정령 클릭 → 숲 안으로 진입
  $(".spirit").on("click", function () {

    if (scene == 0 && moving == false) {
      moving = true;

      $(".spirits").css("opacity", "0");
      $(".spirit").css("pointer-events", "none");

      $(".forest").css({
        "transform": "scale(1.5)",
        "filter": "brightness(0.12)"
      });

      setTimeout(function () {
        $(".story").css("opacity", "1");
      }, 1000);

      setTimeout(function () {
        $(".intro").css("display", "none");
        $(".story").css("pointer-events", "auto");

        scene = 1;
        moving = false;
      }, 2300);
    }

  });

  // 산 클릭 → 살아라 → 암전 없이 아래로 이동
  $(".san-character").on("click", function () {

    if (scene == 1 && moving == false) {
      moving = true;

      $(".live").css({
        "opacity": "1",
        "transform": "translateY(0)"
      });

      setTimeout(function () {
        $(".live").css("opacity", "0");

        $(".camera").css(
          "transform", "translateY(-828px)"
        );
      }, 1800);

      setTimeout(function () {
        scene = 2;
        moving = false;
      }, 4300);
    }

  });

  // 아시타카 클릭 → 대사 등장
  $(".ashitaka-character").on("click", function () {

    if (scene == 2 && moving == false) {
      moving = true;

      $(".beautiful").css({
        "opacity": "1",
        "transform": "translateY(0)"
      });

      setTimeout(function () {
        $(".beautiful").css({
          "pointer-events": "auto",
          "cursor": "pointer"
        });

        scene = 3;
        moving = false;
      }, 1000);
    }

  });

  // 대사 클릭 → 치료 장면
  $(".beautiful").on("click", function () {

    if (scene == 3 && moving == false) {
      moving = true;

      $(".beautiful").css("pointer-events", "none");

      $(".story").css({
        "opacity": "0",
        "pointer-events": "none"
      });

      $(".healing").css("opacity", "1");

      setTimeout(function () {
        $(".story").css("display", "none");
        $(".healing").css("pointer-events", "auto");

        scene = 4;
        moving = false;
      }, 1400);
    }

  });

  // 치료 장면: 배경과 산·늑대를 서로 다르게 이동
  $(".healing").on("mousemove", function (event) {

    if (scene == 4 && moving == false) {
      let area = this.getBoundingClientRect();

      let x = event.clientX - area.left - area.width / 2;
      let y = event.clientY - area.top - area.height / 2;

      $(".healing-bg").css(
        "transform",
        "translate(" + x / 110 + "px, " +
        y / 110 + "px) scale(1.04)"
      );

      $(".healing-pair").css(
        "transform",
        "translate(" + x / 55 + "px, " +
        y / 55 + "px) scale(1.04)"
      );
    }

  });

  // 마우스가 나가면 원래 위치로
  $(".healing").on("mouseleave", function () {
    $(".healing-bg, .healing-pair").css(
      "transform", "translate(0, 0) scale(1.04)"
    );
  });

  // 치료 장면 클릭 → 밝은 숲
  $(".healing").on("click", function () {

    if (scene == 4 && moving == false) {
      moving = true;

      $(".healing").css({
        "opacity": "0",
        "pointer-events": "none"
      });

      $(".bright-scene").css("opacity", "1");

      setTimeout(function () {
        $(".healing").css("display", "none");
        $(".bright-scene").css("pointer-events", "auto");

        scene = 5;
        moving = false;
      }, 1400);
    }

  });

  // 밝은 숲: 산과 늑대 마우스 움직임
  $(".bright-scene").on("mousemove", function (event) {

    if (scene == 5 && moving == false) {
      let area = this.getBoundingClientRect();

      let x = event.clientX - area.left - area.width / 2;
      let y = event.clientY - area.top - area.height / 2;

      $(".bright-san").css(
        "transform",
        "translate(" + x / 45 + "px, " + y / 45 + "px)"
      );

      $(".bright-wolf").css(
        "transform",
        "translate(" + x / 85 + "px, " + y / 85 + "px)"
      );
    }

  });

  $(".bright-scene").on("mouseleave", function () {
    $(".bright-san, .bright-wolf").css(
      "transform", "translate(0, 0)"
    );
  });

  // 밝은 숲 클릭 → 검정색 70%를 덮고 타이틀 등장
  $(".bright-scene").on("click", function () {

    if (scene == 5 && moving == false) {
      moving = true;
      scene = 6;

      // 숲과 인물은 뒤에 그대로 남김
      $(".bright-scene").css("pointer-events", "none");

      $(".bright-san, .bright-wolf").css(
        "transform", "translate(0, 0)"
      );

      $(".title-scene").css("opacity", "1");

      $(".final-director").css({
        "transition-delay": "0.5s",
        "opacity": "1",
        "transform": "translateY(0)"
      });

      $(".title-reveal").css({
        "transition-delay": "0.9s",
        "opacity": "1",
        "transform": "translateY(0)"
      });

      $(".final-release").css({
        "transition-delay": "1.4s",
        "opacity": "1",
        "transform": "translateY(0)"
      });

      $(".restart").css({
        "transition-delay": "2s",
        "opacity": "1",
        "transform": "translateY(0)"
      });

      setTimeout(function () {
        $(".title-scene").css("pointer-events", "auto");
        moving = false;
      }, 3300);
    }

  });

  // 마지막 화면: 타이틀만 마우스를 따라 이동
  $(".title-scene").on("mousemove", function (event) {

    if (scene == 6 && moving == false) {
      let area = this.getBoundingClientRect();

      let x = event.clientX - area.left - area.width / 2;
      let y = event.clientY - area.top - area.height / 2;

      $(".final-title").css(
        "transform",
        "translate(" + x / 55 + "px, " + y / 55 + "px)"
      );
    }

  });

  $(".title-scene").on("mouseleave", function () {
    $(".final-title").css(
      "transform", "translate(0, 0)"
    );
  });

  // 오른쪽 아래 정령 클릭 → 처음으로
  $(".restart").on("click", function () {

    if (scene == 6 && moving == false) {
      window.location.reload();
    }

  });

});