// aos
AOS.init();

// music
const music = document.querySelector(".music");
let isPlaying = true;

function mulai() {
  window.scrollTo(0, 0);

  const soundDoor = document.querySelector(".sound-door");
  if (soundDoor) soundDoor.play();

  const doorSection = document.querySelector("#door-section");
  const leftDoor = document.querySelector(".door.left");
  const rightDoor = document.querySelector(".door.right");
  const instruction = document.querySelector(".door-instruction");

  // hilangkan instruksi saat klik
  if (instruction) instruction.style.display = "none";

  // buka pintu
  leftDoor.style.transform = "rotateY(-100deg)";
  rightDoor.style.transform = "rotateY(100deg)";

  // zoom
  setTimeout(() => {
    doorSection.style.transition = "transform 1s ease-in-out";
    doorSection.style.transform = "scale(6)";
  }, 1200);

  // sembunyikan
  setTimeout(() => {
    doorSection.style.opacity = 0;
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("transition");
    doorSection.style.display = "none";
  }, 2500);

  // mainkan musik
  if (music) {
    music.play();
    isPlaying = true;
  }
}

function toggleMusic(event) {
  event.preventDefault();

  const musicButton = document.getElementById("music-button");

  if (!music) return;

  if (isPlaying) {
    music.pause();
    musicButton.innerHTML = '<i class="fas fa-fw fa-play"></i>';
    musicButton.classList.remove("rotate");
    musicButton.style.transform = "translateY(0)";
  } else {
    music.play();
    musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
    musicButton.classList.add("rotate");
  }

  isPlaying = !isPlaying;
}

const rootElement = document.querySelector(":root");
let scrollTop, scrollLeft;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
}

function handleOpenInvitation() {
  enableScroll();
  document.getElementById("hero").scrollIntoView({ behavior: "smooth" });

  // Tampilkan navbar
  const contentSection = document.getElementById("content-section");
  contentSection.style.display = "block"; // Pastikan navbar ditampilkan
  console.log("Navbar ditampilkan:", contentSection.style.display);
}

// Matikan scroll saat halaman load
disableScroll();

// countdown-wedding
var countdownDate = new Date("May 11, 2025 08:00:00").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countdownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown-wedding").innerHTML = `
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
              <h5>${days}</h5>
              Hari
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
              <h5>${hours}</h5>
              Jam
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
              <h5>${minutes}</h5>
              Menit
            </div>
        </div>
        <div class="col-lg-1 col-3">
            <div class="text-center p-2 rounded text-light">
              <h5>${seconds}</h5>
              Detik
            </div>
        </div>
        `;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-wedding").innerHTML =
      "<span class='text-center p-3 rounded text-light m-2'><h2>sudah dimulai!</h2></span>";
  }
}, 1000);

// nama sambutan
const urlParams = new URLSearchParams(window.location.search);
// const panggilan = urlParams.get("to");
const nama = urlParams.get("to");
const namaSambutan = document.querySelector("#nama-sambutan");

if (nama && namaSambutan) {
  namaSambutan.innerText = `${nama}`;
}

// Fungsi untuk menyalin teks dari elemen .card-number
function copyText(el) {
  // Ambil nomor dari elemen .card-number
  var content = jQuery(el)
    .closest(".credit-card") // naik ke container kartu
    .find(".card-number") // cari elemen nomor kartu
    .text()
    .trim();

  // Buat textarea sementara untuk copy
  var temp = document.createElement("textarea");
  document.body.appendChild(temp);
  temp.value = content.replace(/\s+/g, ""); // hilangkan spasi
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);

  // Ubah tulisan tombol jadi 'Berhasil disalin'
  var originalHTML = jQuery(el).html();
  jQuery(el).text("Berhasil disalin");

  // Balikin ke semula setelah 2 detik
  setTimeout(function () {
    jQuery(el).html(originalHTML);
  }, 2000);
}

// RSVP
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-rsvp");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("status").value.trim();
    const nama = document.getElementById("nama").value.trim();

    if (nama === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nama harus diisi!",
      });
      return;
    }

    if (status == "0") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pilih salah satu status kehadiran terlebih dahulu",
      });
      return;
    }

    const data = new FormData(form);
    const action = e.target.action;
    const input = form.querySelectorAll("input, select, button");
    input.forEach((input) => {
      input.disabled = true;
    });

    fetch(action, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Mengonversi respons menjadi JSON
      })
      .then((data) => {
        // Memeriksa hasil dari respons JSON
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Konfirmasi kehadiran berhasil terkirim!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.message ||
            "Terjadi kesalahan saat mengirim konfirmasi kehadiran.",
        });
      })
      .finally(() => {
        input.forEach((input) => {
          input.disabled = false;
        });
      });
  });
});
