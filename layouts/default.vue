<template>
  <div
    class="layout-container"
    @click="
      () => {
        if (isPlaying === false) {
          play();
          startPlay();
        }
        isPlaying = true;
      }
    "
  >
    <div class="color-mode">
      <input type="checkbox" id="mode" v-model="mode" />
      <label for="mode" @click="changeColor">
        <div class="circle">
          <img src="../assets/moon.png" alt="moon" />
          <img src="../assets/sun.png" alt="sun" />
          <div class="ball" :style="{ top: mode === true ? '50%' : '0' }"></div>
        </div>
      </label>
    </div>
    <div
      class="side-modal-button"
      @click="store.showSide = !store.showSide"
      v-if="showSideButton"
    >
      <Icon
        :name="`${
          showSide === false ? 'mingcute:left-line' : 'mingcute:right-line'
        }`"
        :color="mode === false ? 'white' : 'black'"
      ></Icon>
    </div>
    <div class="side-modal-container" v-if="showSide">
      <div class="side-left-content">
        <div
          @click="store.sideActive = [true, false, false, false, false]"
          :class="{ active: sideActive[0] === true }"
        >
          Faktor
        </div>
        <div
          @click="store.sideActive = [false, true, false, false, false]"
          :class="{ active: sideActive[1] === true }"
        >
          Prima
        </div>
        <div
          @click="store.sideActive = [false, false, true, false, false]"
          :class="{ active: sideActive[2] === true }"
        >
          Relatif Prima
        </div>
        <div
          @click="store.sideActive = [false, false, false, true, false]"
          :class="{ active: sideActive[3] === true }"
        >
          Fermat Test
        </div>
        <div
          @click="store.sideActive = [false, false, false, false, true]"
          :class="{ active: sideActive[4] === true }"
        >
          Lehmer Test
        </div>
      </div>
      <div class="side-right-content">
        <div v-if="sideActive[0] === true" class="faktor">
          <h2>Faktor</h2>
          <p>Input untuk mengetahui faktor dari suatu bilangan</p>
          <div class="input-field">
            <input type="number" v-model="faktor" />
            <button>Submit</button>
          </div>
          <p>
            Faktor dari {{ faktor }} adalah
            {{ factors(faktor).join(", ") || 0 }}
          </p>
        </div>
        <div v-if="sideActive[1] === true">
          <h2>Bilangan Prima</h2>
          <p>
            Menjabarkan faktor dari bilangan untuk mengetahui bilangan prima
          </p>
          <div class="input-field">
            <input type="number" v-model="prima" />
            <button>Submit</button>
          </div>
          <div class="prima-result" v-if="factors(prima).length > 0">
            <h2>{{ prima }}</h2>
            <p v-for="(number, index) in factors(prima)" :key="index">
              {{ prima }} : {{ number }} = {{ prima / number }}
            </p>
          </div>
          <p>
            Perlu diingat bahwa <b>bilangan prima</b> adalah
            <b>bilangan asli</b> yang memiliki <b>dua</b> faktor yaitu
            <b>1</b> dan <b>bilangan itu sendiri</b>
          </p>
          <p>
            Maka <b>{{ prima }}</b
            >&nbsp;
            <span v-if="factors(prima).length === 2">adalah</span>
            <span v-else>bukan</span> bilangan prima
          </p>
        </div>
        <div v-if="sideActive[2] === true">
          <h2>Relatif Prima</h2>
          <p>Input untuk mengetahui kedua bilangan adalah relatif prima</p>
          <div class="input-field">
            <input type="number" v-model="relatif1" />
            <button>Submit</button>
          </div>
          <div class="input-field">
            <input type="number" v-model="relatif2" />
            <button>Submit</button>
          </div>
          <div class="factor-layout">
            <div class="prima-result short" v-if="factors(relatif1).length > 0">
              <h2>{{ relatif1 }}</h2>
              <p v-for="(number, index) in factors(relatif1)" :key="index">
                {{ relatif1 }} : {{ number }} = {{ relatif1 / number }}
              </p>
            </div>
            <div class="prima-result short" v-if="factors(relatif2).length > 0">
              <h2>{{ relatif2 }}</h2>
              <p v-for="(number, index) in factors(relatif2)" :key="index">
                {{ relatif2 }} : {{ number }} = {{ relatif2 / number }}
              </p>
            </div>
          </div>
          <div class="factor-layout">
            <p>
              Faktor dari {{ relatif1 }} adalah
              {{ factors(relatif1).join(", ") || 0 }}
            </p>
            <p>
              Faktor dari {{ relatif2 }} adalah
              {{ factors(relatif2).join(", ") || 0 }}
            </p>
          </div>
          <p>
            FPB({{ relatif1 }},{{ relatif2 }}) =
            {{ __gcd(relatif1, relatif2) }}, dikarenakan nilainya adalah
            {{ __gcd(relatif1, relatif2) }} maka {{ relatif1 }} dan
            {{ relatif2 }}
            <span>{{
              __gcd(relatif1, relatif2) === 1 ? "adalah" : "bukan"
            }}</span>
            relatif prima
          </p>
        </div>
        <div v-if="sideActive[3] === true">
          <h2>Fermat Test</h2>
          <p>Input untuk mengetahui bilangan tersebut adalah bilangan prima</p>
          <div class="input-field">
            <input type="number" v-model="fermat" />
            <button>Submit</button>
          </div>
          <p>
            <b>p = {{ fermat }}, p-1 = {{ fermat - 1 }}</b>
          </p>
          <div class="table-container">
            <table>
              <tr>
                <td>a</td>
                <td
                  v-for="(number, index) in fermat - 2 > 10 ? 10 : fermat - 2"
                  :key="index"
                >
                  {{ number + 1 }}
                </td>
              </tr>
              <tr>
                <td>
                  a<span>{{ fermat - 1 }}</span> mod {{ fermat }}
                </td>
                <td
                  v-for="(number, index) in fermat - 2 > 10 ? 10 : fermat - 2"
                  :key="index"
                >
                  {{ calculateFermat(number + 1, 3, fermat) }}
                </td>
              </tr>
            </table>
            <p v-if="fermat > 12" style="text-align: center; width: 500px">
              <b>...</b>
            </p>
            <table v-if="fermat > 12">
              <tr>
                <td>a</td>
                <td
                  v-for="(number, index) in fermat - 12 > 10 ? 10 : fermat - 12"
                  :key="index"
                >
                  {{ fermat > 22 ? number + fermat - 12 : number + 10 }}
                </td>
              </tr>
              <tr>
                <td>
                  a<span>{{ fermat - 1 }}</span> mod {{ fermat }}
                </td>
                <td
                  v-for="(number, index) in fermat - 12 > 10 ? 10 : fermat - 12"
                  :key="index"
                >
                  {{
                    calculateFermat(
                      fermat > 22 ? number + fermat - 12 : number + 10,
                      3,
                      fermat
                    )
                  }}
                </td>
              </tr>
            </table>
          </div>
          <p>
            Dikarenakan
            {{ factors(fermat).length !== 2 ? "tidak" : "" }} mendapatkan hasil
            1 dari a = 2 sampai {{ fermat - 2 }} maka bilangan bulat p
            {{
              factors(fermat).length === 2
                ? "dinyatakan sebagai bilangan prima."
                : "bukan bilangan prima"
            }}
          </p>
        </div>
        <div v-if="sideActive[4] === true">
          <h2>Lehmer Test</h2>
          <p>Input untuk mengetahui bilangan tersebut adalah bilangan prima</p>
          <div class="input-field">
            <input type="number" v-model="lehmer" />
            <button>Submit</button>
          </div>
          <p>
            <b
              >p = {{ lehmer }}, a = 2, FPB({{ lehmer }}, 2) =
              {{ __gcd(lehmer, 2) }}</b
            >
          </p>
          <p v-if="__gcd(lehmer, 2) !== 1">
            Dikarenakan FPB dari {{ lehmer }} dan 2 bukan 1 maka
            {{ lehmer }} dipastikan bukan bilangan prima.
          </p>
          <p v-else>
            Dikarenakan FPB dari {{ lehmer }} dan 2 adalah 1 maka
            {{ lehmer }} kemungkinan adalah prima, sehingga kita lanjut menguji
            menggunakan lehmer test
          </p>
          <div class="table-container" v-if="__gcd(lehmer, 2) === 1">
            <table>
              <tr>
                <td>e</td>
                <td
                  v-for="(number, index) in lehmer - 2 > 10 ? 10 : lehmer - 2"
                  :key="index"
                >
                  {{ number + 1 }}
                </td>
              </tr>
              <tr>
                <td>a<span>e</span> mod {{ lehmer }}</td>
                <td
                  v-for="(number, index) in lehmer - 2 > 10 ? 10 : lehmer - 2"
                  :key="index"
                >
                  {{ calculateLehmer(number + 1, 2, lehmer) }}
                </td>
              </tr>
            </table>
            <p v-if="lehmer > 12" style="text-align: center; width: 500px">
              <b>...</b>
            </p>
            <table v-if="lehmer > 12">
              <tr>
                <td>e</td>
                <td
                  v-for="(number, index) in lehmer - 12 > 10 ? 10 : lehmer - 12"
                  :key="index"
                >
                  {{ lehmer > 22 ? number + lehmer - 12 : number + 10 }}
                </td>
              </tr>
              <tr>
                <td>a<span>e</span> mod {{ lehmer }}</td>
                <td
                  v-for="(number, index) in lehmer - 12 > 10 ? 10 : lehmer - 12"
                  :key="index"
                >
                  {{
                    calculateLehmer(
                      lehmer > 22 ? number + lehmer - 12 : number + 10,
                      2,
                      lehmer
                    )
                  }}
                </td>
              </tr>
            </table>
          </div>
          <p v-if="__gcd(lehmer, 2) === 1">
            Dikarenakan
            {{ factors(lehmer).length === 2 ? "tidak" : "" }} mendapatkan hasil
            1 dari e = 2 sampai {{ lehmer - 2 }} maka bilangan bulat p
            {{
              factors(lehmer).length === 2
                ? "dinyatakan sebagai bilangan prima."
                : "bukan bilangan prima"
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="tutorial-button" @click="showTutorial = true">
      <Icon
        name="ph:question-bold"
        :color="mode === false ? 'white' : 'black'"
      ></Icon>
    </div>
    <div
      class="tutorial-backdrop"
      v-if="showTutorial"
      @click.self="showTutorial = false"
    >
      <div class="tutorial-content">
        <div class="content-left">
          <div
            :class="{ active: tutorialButtonActive[0] }"
            @click="tutorialActiveChange(0)"
          >
            Intro
          </div>
          <div
            :class="{ active: tutorialButtonActive[1] }"
            @click="tutorialActiveChange(1)"
          >
            Materi
          </div>
          <div
            :class="{ active: tutorialButtonActive[2] }"
            @click="tutorialActiveChange(2)"
          >
            Quiz
          </div>
        </div>
        <div class="content-right">
          <div class="content" v-if="tutorialButtonActive[0] === true">
            <h1>Introduction</h1>
            <div class="content-slide left-right" v-if="tutorialSlide === 1">
              <img src="../assets/intro-1.jpeg" alt="" class="intro-1" />
              <div class="text">
                Prime Numbers merupakan media ajar yang difokuskan untuk edukasi
                bilangan prima <br /><br />
                pengguna dapat memulai dengan memiliki <b>pemula</b> atau
                <b>mahir</b>. Pemula dikhususkan untuk siswa SD sedangkan mahir
                untuk siswa SMP hingga Kuliah. <br /><br />
                Pengguna bisa langsung klik tombol <b>pemula</b> atau
                <b>mahir</b> di tengah tengah layar atau tombol yang ada
                dibagian bawah.
              </div>
            </div>
            <div
              class="content-slide left-right"
              v-else-if="tutorialSlide === 2"
            >
              <img src="../assets/intro-4.jpeg" alt="" class="intro-4" />
              <div class="text">
                Setelah pengguna memilih <b>Pemula</b> atau <b>Mahir</b>,
                pengguna akan masuk ke halaman materi yang terdiri dari
                <b>sub materi</b> dan <b>quiz</b>. <br /><br />
                Pengguna diharuskan untuk mulai dari menyelesaikan sub materi
                satu per satu terlebih dahulu setelah itu baru dilanjutkan ke
                quiz. <br /><br />
                selain itu jika ingin kembali ke halaman utama bisa klik kotak
                merah
              </div>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 3"
            >
              <img src="../assets/intro-5.jpeg" alt="" class="intro-5" />
              <p style="text-align: center">
                Pengguna bisa langsung klik sub materi tersebut untuk memulai
                pembelajaran dan setiap perkembangan akan terlihat seperti kotak
                putih diatas.Setiap perkembangan pengguna bisa dilanjutkan
                kemballi jika klik kembali sub materi tersebut
              </p>
              <img src="../assets/intro-6.jpeg" alt="" class="intro-6" />
              <p style="text-align: center">
                Jika pengguna sudah selesaikan sub bab tersebut maka tampilannya
                akan berubah seperti kotak putih diatas dan pengguna masih tetap
                bisa mengulangi materi tersebut dengan klik sub materinya lagi
              </p>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 4"
            >
              <img src="../assets/intro-2.jpeg" alt="" class="intro-2" />
              <p style="text-align: center">
                Selain itu, pengguna juga bisa mengubah tampilan warna ke warna
                <b>terang</b> atau warna <b>gelap</b> dengan klik tombol berikut
                di sudut kanan
              </p>
              <img src="../assets/intro-3.jpeg" alt="" class="intro-3" />
              <p>
                Jika pengguna ingin membuka kembali panduan ini bisa klik tombol
                berikut di sudut kanan
              </p>
            </div>
          </div>
          <div class="content" v-if="tutorialButtonActive[1] === true">
            <h1>Materi</h1>
            <div class="content-slide left-right" v-if="tutorialSlide === 1">
              <img src="../assets/materi-1.jpeg" alt="" class="materi-1" />
              <div class="text">
                Setiap sub materi berisikan materi dalam bentuk <b>Text</b>,
                <b>Animasi</b> dan <b>Gambar</b> yang ditampilkan di tengah
                tengah layar. <br /><br />
                Selain itu, Jika pengguna ingin lanjut ke materi selanjutnya
                bisa klik tombol <b>kanan</b> di kotak merah tetapi setiap
                materi minimal harus tunggu selama <b>3 detik</b> untuk lanjut.
                Jika ingin kembali ke materi sebelumnya juga bisa klik tombol
                <b>kiri</b> di kotak kanan. <br /><br />
                Jika pengguna ingin kembali ke <b>halaman utama</b>, maka
                pengguna bisa klik tombol di kotak putih
              </div>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 2"
            >
              <img src="../assets/materi-2.jpeg" alt="" class="materi-2" />
              <p>
                Jika sub materi tersebut telah selesai maka akan menampilkan
                tampilan seperti diatas. Pengguna bisa memilih untuk kembali ke
                halaman utama dengan klik <b>Home</b> atau klik
                <b>Berikutnya</b> untuk lanjut ke sub materi berikutnya.
              </p>
            </div>
          </div>
          <div class="content" v-if="tutorialButtonActive[2] === true">
            <h1>Quiz</h1>
            <div class="content-slide left-right" v-if="tutorialSlide === 1">
              <img src="../assets/pemula-quiz-1.jpeg" alt="" class="materi-1" />
              <div class="text">
                <b style="font-size: 2rem">Quiz Pemula</b> <br /><br />
                <b>Mencari Bilangan Prima</b> <br />
                Pada quiz ini, pengguna diminta untuk mencari
                <b>bilangan prima</b> dari kedelapan pilihan tersebut.
                <br /><br />
                Pengguna bisa langsung klik salah stau angka yang pengguna
                merasa angka tersebut adalah <b>bilangan prima</b>
              </div>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 2"
            >
              <b style="font-size: 2rem">Quiz Pemula</b>
              <img
                src="../assets/pemula-quiz-2.jpeg"
                alt=""
                class="pemula-quiz-2"
              />
              <div class="text" style="text-align: center">
                Setiap permainan akan diberikan target <b>score</b> yang harus
                dipenuhi serta <b>waktu</b> untuk pengerjaan.
              </div>
              <img src="../assets/mahir-quiz-4.jpeg" alt="" />
              <div class="text" style="text-align: center">
                Setiap pengguna mencoba menjawab akan ada notifikasi bahwa
                jawaban yang dipilih benar atau tidak seperti diatas. Selain
                itu, Jika jawabannya benar maka akan ditambahin score sebanyak
                <b>10</b> dan harus dilanjutkan hingga score mencapai <b>1000</b
                ><br /><br />
                Jika tantangan tidak berhasil maka permainan dianggap kalah.
              </div>
            </div>
            <div
              class="content-slide left-right"
              v-else-if="tutorialSlide === 3"
            >
              <img src="../assets/mahir-quiz-1.jpeg" alt="" class="materi-1" />
              <div class="text">
                <b style="font-size: 2rem">Quiz Mahir</b> <br /><br />
                <b>Snowball Prime</b> <br />
                Snowball prima merupakan permainan menentukan
                <b>bilangan prima</b>
                dengan angka yang lebih besar.
                <br /><br />
                Angka sementara yang diberikan akan ada di sudut
                <b>bawah</b> seperti contoh <b>660</b>
              </div>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 4"
            >
              <b style="font-size: 2rem">Quiz Mahir</b>
              <img src="../assets/mahir-quiz-2.jpeg" alt="" class="materi-1" />
              <div class="text" style="text-align: center">
                Permainan ini diminta untuk menambahkan <b>1 angka</b> dipaling
                <b>belakang</b> supaya angka secara keseluruhan merupakan
                <b>bilangan prima</b>
              </div>
              <img
                src="../assets/mahir-quiz-5.jpeg"
                alt=""
                class="pemula-quiz-1"
              />
              <div class="text" style="text-align: center">
                Pengguna bisa menambahkan <b>1 angka</b> dengan mengisi angka
                pada kotak yang sudah disediakan seperti gambar diatas.
              </div>
            </div>
            <div
              class="content-slide top-bottom"
              v-else-if="tutorialSlide === 5"
            >
              <b style="font-size: 2rem">Quiz Pemula</b>
              <img
                src="../assets/mahir-quiz-3.jpeg"
                alt=""
                class="pemula-quiz-2"
              />
              <div class="text" style="text-align: center">
                Setiap permainan akan diberikan target <b>score</b> yang harus
                dipenuhi serta <b>waktu</b> untuk pengerjaan.
              </div>
              <img src="../assets/mahir-quiz-4.jpeg" alt="" />
              <div class="text" style="text-align: center">
                Setiap pengguna mencoba menjawab akan ada notifikasi bahwa
                jawaban yang dipilih benar atau tidak seperti diatas. Selain
                itu, Jika jawabannya benar maka akan ditambahin score sebanyak
                <b>10</b> dan harus dilanjutkan hingga score mencapai <b>50</b
                ><br /><br />
                Jika tantangan tidak berhasil maka permainan dianggap kalah.
              </div>
            </div>
          </div>
          <Icon
            name="carbon:close-outline"
            class="close-button"
            @click="
              () => {
                showTutorial = false;
                tutorialSlide = 1;
                changeButton();
                store.changeTutorial();
              }
            "
          ></Icon>
          <div class="pagination-container">
            <button @click="prevSlide" :disabled="showButton[0]">Prev</button>
            <p>{{ tutorialSlide }}</p>
            <button @click="nextSlide" :disabled="showButton[1]">Next</button>
          </div>
        </div>
      </div>
    </div>
    <div class="snow">
      <div
        class="snow-item"
        v-for="i in snowQty"
        :key="i"
        :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
      ></div>
    </div>
    <div class="content-container">
      <slot />
      <AppFooter :active="active" @onChangeActive="changeActive"></AppFooter>
    </div>
    <div class="snow">
      <div
        class="snow-item"
        v-for="i in snowQty"
        :key="i"
        :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/index";
import { storeToRefs } from "pinia";
import { useSound } from "@vueuse/sound";
import audio from "../assets/audio.mp3";

const store = useCounterStore();
let { mode, tutorial, showSideButton, sideActive, showSide } =
  storeToRefs(store);
const { play, isPlaying } = useSound(audio, { volume: 0.15 });
let tutorialButtonActive = ref([true, false, false]);
let showTutorial = ref(tutorial.value === false ? true : false);
let tutorialSlide = ref(1);
let showButton = ref([true, false]);
let faktor = ref(12);
let prima = ref(12);
let relatif1 = ref(11);
let relatif2 = ref(12);
let lehmer = ref(12);
let fermat = ref(12);

store.showSideButton = true;
store.showSide = false;

let startPlay = () => {
  setInterval(() => {
    play();
  }, 80000);
};

function factors(n) {
  var num_factors = [],
    i;
  for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1) {
    if (n % i === 0) {
      num_factors.push(i);
      if (n / i !== i) num_factors.push(n / i);
    }
  }

  num_factors.sort(function (x, y) {
    return x - y;
  });

  return num_factors;
}

let tutorialActiveChange = (idx) => {
  tutorialSlide.value = 1;
  tutorialButtonActive.value = [false, false];
  tutorialButtonActive.value[idx] = true;
  changeButton();
};

function calculateLehmer(e, a, p) {
  let result = Math.pow(a, e) % p;
  if (isNaN(result)) {
    let c = 1;
    for (let i = 0; i < e; i++) {
      c *= a;
      c %= p;
    }
    return c;
  }
  return result;
}

function calculateFermat(e, a, p) {
  let result = Math.pow(p - 1, e) % p;
  if (isNaN(result)) {
    let c = 1;
    for (let i = 0; i < e; i++) {
      c *= p - 1;
      c %= p;
    }
    return c;
  }
  return result;
}

function __gcd(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

let changeButton = () => {
  if (tutorialButtonActive.value[0] === true) {
    if (tutorialSlide.value === 4) {
      showButton.value = [false, true];
    } else {
      if (tutorialSlide.value > 1) {
        showButton.value = [false, false];
      } else {
        showButton.value = [true, false];
      }
    }
  } else if (tutorialButtonActive.value[1] === true) {
    if (tutorialSlide.value === 2) {
      showButton.value = [false, true];
    } else {
      if (tutorialSlide.value > 1) {
        showButton.value = [false, false];
      } else {
        showButton.value = [true, false];
      }
    }
  } else if (tutorialButtonActive.value[2] === true) {
    if (tutorialSlide.value === 5) {
      showButton.value = [false, true];
    } else {
      if (tutorialSlide.value > 1) {
        showButton.value = [false, false];
      } else {
        showButton.value = [true, false];
      }
    }
  }
};

let nextSlide = () => {
  tutorialSlide.value = tutorialSlide.value + 1;

  changeButton();
};

let prevSlide = () => {
  tutorialSlide.value = tutorialSlide.value - 1;

  changeButton();
};

let getRandom = () => {
  return Math.random() * 95;
};
let snowQty = ref(70);

let changeColor = () => {
  if (mode.value === false) {
    document.documentElement.style.setProperty("--primary", "#d8cfd0");
    document.documentElement.style.setProperty("--pastelPrimary", "#697184");
    document.documentElement.style.setProperty("--purple", "#b1a6a4");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#000000");
    document.documentElement.style.setProperty("--darkBg", "#f2f1ef");
    document.documentElement.style.setProperty("--gray", "#737373");
  } else {
    document.documentElement.style.setProperty("--primary", "#25243c");
    document.documentElement.style.setProperty("--pastelPrimary", "#333151");
    document.documentElement.style.setProperty("--purple", "#846cb6");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#ffffff");
    document.documentElement.style.setProperty("--darkBg", "#161428");
    document.documentElement.style.setProperty("--gray", "rgb(140, 140, 140)");
  }
};

onMounted(() => {
  if (mode.value === true) {
    document.documentElement.style.setProperty("--primary", "#d8cfd0");
    document.documentElement.style.setProperty("--pastelPrimary", "#697184");
    document.documentElement.style.setProperty("--purple", "#b1a6a4");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#000000");
    document.documentElement.style.setProperty("--darkBg", "#f2f1ef");
    document.documentElement.style.setProperty("--gray", "#737373");
  }
});

let active = ref([false, true, false]);
let router = useRouter();
if (router.currentRoute._value.fullPath.includes("pemula")) {
  active.value = [true, false, false];
} else if (router.currentRoute._value.fullPath.includes("amatir")) {
  active.value = [false, false, true];
} else {
  active.value = [false, true, false];
}

let changeActive = (index) => {
  active.value = [false, false, false];
  active.value[index] = true;
};
</script>

<style lang="scss" scoped>
.layout-container {
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $darkBg;
  grid-template-columns: 1fr auto 1fr;
  position: relative;
  overflow: hidden;

  .side-modal-container {
    position: fixed;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
    width: 370px;
    height: 90vh;
    z-index: 5;
    animation: showright 0.5s linear;
    display: grid;
    grid-template-columns: 120px 1fr;

    & > * {
      width: 100%;
    }
    .side-left-content {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      justify-content: flex-start;
      align-items: flex-end;
      width: 100%;

      div {
        margin-right: 10px;
        background-color: $pastelPrimary;
        width: 100%;
        padding-block: 0.5rem;
        text-align: end;
        padding-right: 10px;
        color: $white;
        clip-path: polygon(8% 0, 100% 0%, 100% 100%, 8% 100%, 0% 50%);
        transition: all 0.2s linear;

        &.active {
          background-color: $primary;
          height: 60px;
          width: 120%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 1.2rem;
        }
      }
    }

    .side-right-content {
      background-color: $white;
      max-height: 90vh;
      overflow-y: auto;
      width: 280px;

      &::-webkit-scrollbar {
        display: none;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        gap: 0.8rem;

        h2 {
          font-size: 1.7rem;
          font-weight: bold;
        }

        .factor-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-start;
          padding: 0;
          width: 100%;

          & > * {
            width: 100%;
            max-width: 100%;
          }
        }

        .table-container {
          overflow: auto;
          width: 250px;
          padding: 0;
          align-self: flex-start;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;

          table {
            font-size: 0.9rem;
            border: 1px solid black;
            width: 500px;

            td {
              border: 1px solid black;
              min-width: 20px;
              span {
                position: relative;
                top: -5px;
                font-size: 0.7rem;
              }
            }
          }
        }
        .input-field {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          flex-direction: row;
          max-width: 250px;
          padding: 0;

          input {
            border: 1px solid $black;
            border-radius: 10px;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            &[type="number"] {
              -moz-appearance: textfield;
            }
          }

          button {
            color: $black;
            font-weight: bold;
          }
        }

        .prima-result.short {
          max-height: 250px;
        }
        .prima-result {
          border: 1px dashed $black;
          max-height: 300px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-inline: 0;
          min-width: 120px;

          &::-webkit-scrollbar {
            display: none;
          }
        }

        & > * {
          text-align: center;
        }
      }
    }
  }
  .tutorial-backdrop {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 301;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: $black;
    .tutorial-content {
      display: grid;
      grid-template-columns: 100px 1fr;
      width: 1000px;
      min-height: 80vh;
      color: $black;

      .content-left {
        width: 100%;
        gap: 0.2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        color: $black;

        & > * {
          width: 100%;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 20px;
          background-color: red;
          clip-path: polygon(
            100% 0%,
            100% 47%,
            100% 100%,
            25% 100%,
            0% 50%,
            25% 0%
          );
          color: $white;
          background-color: $pastelPrimary;
          cursor: pointer;
          transition: all 0.3s linear;

          &.active {
            height: 60px;
            width: 120%;
            background-color: $primary;
          }
        }
      }

      .content-right {
        width: 100%;
        background-color: $white;
        position: relative;
        height: 100%;
        color: $black;
        .content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-block: 1rem 4rem;
          padding-inline: 3rem;
          flex-direction: column;

          h1 {
            font-size: 2rem;
          }
        }

        .content-slide {
          align-items: center;
          justify-content: center;
          gap: 1rem;
          height: 100%;

          .intro-1 {
            width: 280px;
          }

          .intro-4 {
            width: 350px;
          }

          .materi-1 {
            width: 300px;
          }

          .pemula-quiz-2 {
            width: 90%;
          }
          .pemula-quiz-1 {
            width: 60%;
          }
        }

        .left-right {
          display: flex;
        }

        .top-bottom {
          display: flex;
          flex-direction: column;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 2rem;
          cursor: pointer;
          color: $black;

          &:hover {
            color: red;
          }
        }

        .pagination-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;

          button {
            padding: 0.5rem 1.5rem;
            background-color: $pastelPrimary;
            color: $white;
            border-radius: 10px;

            &:hover {
              background-color: $primary;
            }

            &:disabled {
              background-color: gray;
            }
          }
        }
      }
    }
  }
  .tutorial-button {
    position: absolute;
    top: 200px;
    right: 15px;
    z-index: 300;
    cursor: pointer;

    svg {
      font-size: 2.5rem;
    }
  }

  .side-modal-button {
    position: absolute;
    top: 260px;
    right: 15px;
    z-index: 300;
    cursor: pointer;
    border: 2px solid $white;
    padding-block: 1.5rem;
    border-radius: 50px;

    svg {
      font-size: 2.5rem;
    }
  }
  .color-mode {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 300;

    input {
      visibility: hidden;
    }

    .circle {
      position: relative;
      height: 100px;
      width: 50px;
      background-color: $white;
      border-radius: 100px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: $primary;

      img {
        width: 100%;
        padding: 0.7rem;
      }

      .ball {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 50px;
        border-radius: 100px;
        transition: all 0.3s ease-out;
        background-image: linear-gradient(to bottom, #bd69e2, #d45795);
        box-shadow: 0px 0px 16px #d45795;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 97vh;
    box-shadow: 0px 0px 16px $primary;
    border-radius: 10px;
    justify-content: space-between;
    background-color: $primary;

    @media only screen and (max-width: 500px) {
      width: 100%;
      height: 100vh;
    }
  }

  .snow {
    position: relative;
    width: 100%;
    height: 100vh;

    @media only screen and (max-width: 500px) {
      display: none;
    }

    .snow-item {
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: $gray;
      border-radius: 100px;
    }
  }
}
@keyframes showright {
  from {
    transform: translate(50px, -50%);
    opacity: 0;
  }
  to {
    transform: translate(0px, -50%);
    opacity: 1;
  }
}
</style>
