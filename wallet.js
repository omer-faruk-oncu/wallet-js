const tarih = document.querySelector("#date");
const harcamaMiktari = document.querySelector("#harcama-miktar");
const harcamaAlani = document.querySelector("#harcama-alani");
const kaydet = document.querySelector("#kaydet");
const inputEkle = document.querySelector("#ekle-input");
const btnEkle = document.querySelector("#ekle-buton");
const harcamaTablosu = document.querySelector(".harcama-tablosu");
const tabloBody = document.querySelector(".tablo-body");
const gelir = document.querySelector(".gelir");
const gider = document.querySelector(".gider");
const kalan = document.querySelector(".kalan");
const btnTemizle = document.querySelector("#btn-temizle");

const harcamaEkle = () => {
  if (!harcamaMiktari.value || !tarih.value || !harcamaAlani.value) {
    alert("Lütfen tüm alanları giriniz...");
    return;
  }

  let tabloTr = document.createElement("tr");
  let tabloTarih = document.createElement("td");
  let tabloHarcamaAlani = document.createElement("td");
  let tabloMiktar = document.createElement("td");
  let tabloIslem = document.createElement("td");
  let silButon = document.createElement("button");

  tabloTarih.textContent = tarih.value;
  tabloHarcamaAlani.textContent = harcamaAlani.value;
  tabloMiktar.textContent = harcamaMiktari.value;
  silButon.textContent = "🗑️";
  
  tabloTr.appendChild(tabloTarih);
  tabloTr.appendChild(tabloHarcamaAlani);
  tabloTr.appendChild(tabloMiktar);
  tabloTr.appendChild(tabloIslem);
  tabloIslem.appendChild(silButon);

  tabloBody.appendChild(tabloTr);

  silButon.onclick = function () {
    this.parentElement.parentElement.remove();

    giderHesapla();
    kalanHesapla();
  };


  giderHesapla();
  kalanHesapla();
};

kaydet.addEventListener("click", () => {
  harcamaEkle();
  localStorage.setItem("gelir", gelir.textContent);
  localStorage.setItem("gider", gider.textContent);
  localStorage.setItem("kalan", kalan.textContent);
});

btnEkle.addEventListener("click", () => {
    
  if (!inputEkle.value) {
      alert("Lütfen Gelirinizi Giriniz...");
      return;
  }

  gelir.textContent = parseInt(gelir.textContent) + parseInt(inputEkle.value);
  inputEkle.value = "";
  giderHesapla();
  kalanHesapla();
  localStorage.setItem("gelir", gelir.textContent);
  localStorage.setItem("gider", gider.textContent);
  localStorage.setItem("kalan", kalan.textContent);
  
});

btnTemizle.addEventListener("click", () => {
  gelir.textContent = "0";
  gider.textContent = "0";
  kalan.textContent = "0";
  tarih.value = "";
  harcamaMiktari.value = "";
  harcamaAlani.value = "";
  tabloBody.innerHTML = "";
});

const giderHesapla = () => {
  let toplamGider = Array.from(document.querySelectorAll(".harcama-tablosu td:nth-child(3)"))
  .reduce((acc, td) => acc + parseInt(td.textContent || 0), 0);
  gider.textContent = toplamGider;
};

const kalanHesapla = () => {
  let kalanMiktar = parseInt(gelir.textContent) - parseInt(gider.textContent);
  kalan.textContent = kalanMiktar;
  kalan.style.color = kalanMiktar < 0 ? "red" : "black";
};

document.addEventListener("DOMContentLoaded", () => {
  gelir.textContent = localStorage.getItem("gelir") || "0";
  gider.textContent = localStorage.getItem("gider") || "0";
  kalan.textContent = localStorage.getItem("kalan") || "0";
});

