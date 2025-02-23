'use strict';

// Selected elements
const darkModeBtn = document.getElementById('dark-mode-btn');
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
const bodyContainer = document.querySelector('.body-container');
const detailsContent = document.querySelector('.details-content');
// const countryCards = main.querySelectorAll('.country-card');

// Get JSON function
const getJSON = function (url, errorMsg = 'Something went wrong') {
  const loaderHtml = `<div class="loader-container">
    <div class="wrapper">
      <div class="loader">
        <div class="dot"></div>
      </div>
      <div class="loader">
        <div class="dot"></div>
      </div>
      <div class="loader">
        <div class="dot"></div>
      </div>
      <div class="loader">
        <div class="dot"></div>
      </div>
      <div class="loader">
        <div class="dot"></div>
      </div>
      <div class="loader">
        <div class="dot"></div>
      </div>
    </div>
    <div class="text">TerraData</div>
  </div>`;

  main.innerHTML = loaderHtml;
  navListEl.style.display = 'none';
  searchSection.style.display = 'none';

  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// Get and Display country data
const getCountryData = function () {
  getJSON(`https://restcountries.com/v3.1/all`, 'Countries not found').then(
    data => {
      main.innerHTML = '';
      navListEl.style.display = 'flex';
      searchSection.style.display = 'flex';
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

        main.insertAdjacentHTML('beforeend', html);
      });

      // Log all country cards after they've been created
      const countryCards = document.querySelectorAll('.country-card');
      console.log('All country cards:', countryCards);
    }
  );
};

// Function to display a country card
const displayCountryCard = function (country) {
  const html = `
    <div class="country-card ${country.name.common.toLowerCase()}">
      <img src="${country.flags.png}" alt="Country Flag" class="country-flag" />
      <div class="country-info">
        <h2 class="country-name">${country.name.common}</h2>
        <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${
          country.population >= 1000000
            ? `${(country.population / 1000000).toFixed(2)} million`
            : `${(country.population / 1000).toFixed(2)} thousand`
        }</span></p>
        <p><strong>Region 🌍:</strong> <span>${country.region}</span></p>
        <p><strong>Capital 📍:</strong> <span>${country.capital}</span></p>
        <p><strong>Currency 💰:</strong> <span>${
          Object.values(country.currencies)[0].name
        }</span></p>
      </div>
    </div>`;

  main.insertAdjacentHTML('beforeend', html);
};

// Function to clear all country cards
const clearCountries = () => {
  main.innerHTML = '';
};

// Function to handle the search
const handleSearch = async () => {
  try {
    // Get search term and clean it
    const searchTerm = searchBar.value.trim().toLowerCase();

    // Don't search if input is empty
    if (!searchTerm) {
      return getCountryData(); // Show all countries if search is empty
    }

    // Clear existing countries
    clearCountries();

    // Fetch country data
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${searchTerm}`
    );
    const data = await response.json();

    // If no results found
    if (!data || data.status === 404) {
      main.innerHTML =
        '<p class="error">No countries found. Try another search.</p>';
      return;
    }

    // Display matching countries
    data.forEach(country => displayCountryCard(country));
  } catch (error) {
    main.innerHTML =
      '<p class="error">Something went wrong. Please try again.</p>';
  }
};

// Display country details in the details page
const displayDetails = function () {
  const html = `
        <img
          src="${this.flags.png}"
          alt="Country Flag"
          class="country-flag"
        />
        <div class="country-info2">
          <h2 class="country-name2">${this.name.common}</h2>
          <p><strong>Native Name:</strong> <span>Native Name</span></p>
          <p><strong>Population:</strong> <span>${
            this.population >= 1000000
              ? `${(country.population / 1000000).toFixed(2)} million`
              : `${(country.population / 1000).toFixed(2)} thousand`
          }</span></p>
          <p><strong>Region:</strong> <span>${this.region}</span></p>
          <p><strong>Sub Region:</strong> <span>Sub Region</span></p>
          <p><strong>Capital:</strong> <span>${this.capital}</span></p>
          <p class="top-level-domain">
            <strong>Top Level Domain:</strong> <span>Top Level Domain</span>
          </p>
          <p><strong>Currencies:</strong> <span>${
            Object.values(country.currencies)[0].name
          }</span></p>
          <p><strong>Languages:</strong> <span>Languages</span></p>

          <p id="border-countries--p"><strong>Border Countries:</strong></p>
          <div class="border-countries">
            <button class="border-countries-btn">Country 1</button>
            <button class="border-countries-btn">Country 2</button>
            <button class="border-countries-btn">Country 3</button>
          </div>
        </div>`;

  detailsContent.insertAdjacentHTML('beforeend', html);
};

// countryCards.forEach(card => {
//   card.addEventListener('click', function () {
//     alert('I was clicked!');
//   });
// });

// Switch themes
const switchDarkMode = function () {
  const elements = [
    navListEl,
    body,
    main,
    countryCards,
    detailsContainer,
    backBtn,
    searchBar,
    searchBtn,
    searchSection,
    bodyContainer,
  ];

  elements.forEach(el => {
    el.classList.add('dark-mode');
  });

  // Hide dark mode button and show light mode button
  darkModeBtn.style.display = 'none';
  lightModeBtn.style.display = 'block';
};

const switchLightMode = function () {
  const elements = [
    navListEl,
    body,
    main,
    countryCards,
    detailsContainer,
    backBtn,
    searchBar,
    searchBtn,
    searchSection,
    bodyContainer,
  ];

  elements.forEach(el => {
    el.classList.remove('dark-mode');
  });

  // Hide light mode button and show dark mode button
  lightModeBtn.style.display = 'none';
  darkModeBtn.style.display = 'block';
};

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchBar.addEventListener('keyup', e => {
  if (e.key === 'Enter') handleSearch();
});

darkModeBtn.addEventListener('click', switchDarkMode);
lightModeBtn.addEventListener('click', switchLightMode);

// switchLightMode();
getCountryData();
