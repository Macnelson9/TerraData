'use strict';

// Selected elements
const darkModeBtn = document.querySelector('.dark-mode-btn');
const lightModeBtn = document.getElementById('light-mode-btn');
const searchBtn = document.querySelector('.search-btn');
const backBtn = document.querySelector('.back-btn');
const borderCountriesBtns = document.querySelectorAll('.border-countries-btn');
const searchBar = document.getElementById('search-bar');
const filterEl = document.getElementById('region');
const navListEl = document.querySelector('.nav-list');
const body = document.querySelector('.body');
const main = document.querySelector('.main');
const searchSection = document.querySelector('.search-section');
const detailsContainer = document.querySelector('.details-container');

// Get JSON function
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// Get and Display country data
const getCountryData = function () {
  getJSON(`https://restcountries.com/v3.1/all`, 'Countries not found').then(
    data => {
      // console.log(data);
      data.forEach(item => {
        // console.log(item);
        const html = `<div class="country-card ${
          item.name.common
        }" data-href="country.html">
          <img src="${
            item.flags.png
          }" alt="Country Flag" class="country-flag" />
          <div class="country-info">
            <h2 class="country-name">${item.name.common}</h2>
            <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${
              item.population >= 1000000
                ? `${(item.population / 1000000).toFixed(2)} million`
                : `${(item.population / 1000).toFixed(2)} thousand`
            }</span></p>
            <p><strong>Region 🌍:</strong> <span>${item.region}</span></p>
            <p><strong>Capital 📍:</strong> <span>${item.capital}</span></p>
            <p><strong>Currency 💰:</strong> <span>${
              Object.values(item.currencies)[0].name
            }</span></p>
        </div>`;

        // main.insertAdjacentHTML('beforeend', html);
      });

      // Add event listeners after cards are created
      // const countryCards = document.querySelectorAll('.country-card');
      // countryCards.forEach(card => {
      //   card.addEventListener('click', function () {
      //     const href = this.getAttribute('data-href');
      //     if (href) {
      //       window.location.href = href;
      //     }
      //   });
      // });
    }
  );
};

const countrySearch = function () {
  searchBtn.addEventListener('click', function () {
    const searchCountry = searchBar.value;

    getJSON(
      `https://restcountries.com/v3.1/name/${searchCountry}`,
      'Country not found'
    ).then(data => {
      console.log(data);
      const html = `<div class="country-card" data-href="country.html">
          <img src="${
            data.flags.png
          }" alt="Country Flag" class="country-flag" />
          <div class="country-info">
            <h2 class="country-name">${data.name.common}</h2>
            <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${
              data.population >= 1000000
                ? `${(data.population / 1000000).toFixed(2)} million`
                : `${(data.population / 1000).toFixed(2)} thousand`
            }</span></p>
            <p><strong>Region 🌍:</strong> <span>${data.region}</span></p>
            <p><strong>Capital 📍:</strong> <span>${data.capital}</span></p>
            <p><strong>Currency 💰:</strong> <span>${
              Object.values(data.currencies)[0].name
            }</span></p>
        </div>`;

      main.insertAdjacentHTML('beforeend', html);
    });
  });
};

getCountryData();
countrySearch();
