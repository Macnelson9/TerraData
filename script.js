'use strict';

// Selected elements
const darkModeBtn = document.querySelector('#dark-mode-btn');
const lightModeBtn = document.querySelector('#light-mode-btn');
const searchBtn = document.querySelector('.search-btn');
const backBtn = document.querySelector('.back-btn');
const borderCountriesBtns = document.querySelectorAll('.border-countries-btn');
const searchBar = document.getElementById('search-bar');
const filterEl = document.getElementById('region');
const navListEl = document.querySelector('.nav-list');
const body = document.querySelector('body');
const main = document.querySelector('.main');
const searchSection = document.querySelector('.search-section');
const bodyContainer = document.querySelector('.body-container');
const detailsContent = document.querySelector('.details-content');
const detailsContainer = document.querySelector('.details-container');
let loaderHtml;

// Format population correctly
const formatPopulation = function (population) {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(2)} billion`;
  } else if (population >= 100000000) {
    return population.toLocaleString();
  } else if (population >= 10000000) {
    return population.toLocaleString();
  } else if (population >= 1000000) {
    return population.toLocaleString();
  } else {
    return population.toLocaleString();
  }
};

// Get JSON function
const getJSON = function (url, errorMsg = 'Something went wrong') {
  loaderHtml = `<div class="loader-container">
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
        }" data-href="country.html" data-country='${JSON.stringify(item)}'>
          <img src="${
            item.flags.png
          }" alt="Country Flag" class="country-flag" />
          <div class="country-info">
            <h2 class="country-name">${item.name.common}</h2>
            <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${formatPopulation(
              item.population
            )}</span></p>
            <p><strong>Region 🌍:</strong> <span>${item.region}</span></p>
            <p><strong>Capital 📍:</strong> <span>${item.capital}</span></p>
            <p><strong>Currency 💰:</strong> <span>${
              Object.values(item.currencies)[0].name
            }</span></p>
        </div>`;

        main.insertAdjacentHTML('beforeend', html);

        const countryCards = document.querySelectorAll('.country-card');
        countryCards.forEach(card => {
          card.addEventListener('click', function () {
            const countryData = JSON.parse(this.dataset.country);
            const href = this.dataset.href;

            if (href) {
              // Store country data in sessionStorage
              sessionStorage.setItem(
                'selectedCountry',
                JSON.stringify(countryData)
              );
              window.location.href = href;
            }
          });
        });
      });
    }
  );
};

// Function to display a country card
const displayCountryCard = function (country) {
  const html = `
    <div class="country-card ${country.name.common.toLowerCase()}" data-href="country.html" data-country='${JSON.stringify(
    country
  )}'>
      <img src="${country.flags.png}" alt="Country Flag" class="country-flag" />
      <div class="country-info">
        <h2 class="country-name">${country.name.common}</h2>
        <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${formatPopulation(
          country.population
        )}</span></p>
        <p><strong>Region 🌍:</strong> <span>${country.region}</span></p>
        <p><strong>Capital 📍:</strong> <span>${country.capital}</span></p>
        <p><strong>Currency 💰:</strong> <span>${
          Object.values(country.currencies)[0].name
        }</span></p>
      </div>
    </div>`;

  main.insertAdjacentHTML('beforeend', html);

  const newCard = main.lastElementChild;
  newCard.addEventListener('click', function () {
    const countryData = JSON.parse(this.dataset.country);
    const href = this.dataset.href;

    if (href) {
      sessionStorage.setItem('selectedCountry', JSON.stringify(countryData));
      window.location.href = href;
    }
  });
};

// Function to clear all country cards
const clearCountries = () => {
  main.innerHTML = '';
};

// Function to handle the search
const handleSearch = async () => {
  try {
    // Get search term
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

// Filter function
const filterRegion = function (region) {
  getJSON(
    `https://restcountries.com/v3.1/region/${region}`,
    'Countries not found'
  ).then(data => {
    main.innerHTML = '';
    navListEl.style.display = 'flex';
    searchSection.style.display = 'flex';
    data.forEach(item => {
      const html = `<div class="country-card ${
        item.name.common
      }" data-href="country.html" data-country='${JSON.stringify(item)}'>
          <img src="${
            item.flags.png
          }" alt="Country Flag" class="country-flag" />
          <div class="country-info">
            <h2 class="country-name">${item.name.common}</h2>
            <p><strong>Population 👨‍👩‍👧‍👦:</strong> <span>${formatPopulation(
              item.population
            )}</span></p>
            <p><strong>Region 🌍:</strong> <span>${item.region}</span></p>
            <p><strong>Capital 📍:</strong> <span>${item.capital}</span></p>
            <p><strong>Currency 💰:</strong> <span>${
              Object.values(item.currencies)[0].name
            }</span></p>
        </div>`;

      main.insertAdjacentHTML('beforeend', html);

      const countryCards = document.querySelectorAll('.country-card');
      countryCards.forEach(card => {
        card.addEventListener('click', function () {
          const countryData = JSON.parse(this.dataset.country);
          const href = this.dataset.href;

          if (href) {
            sessionStorage.setItem(
              'selectedCountry',
              JSON.stringify(countryData)
            );
            window.location.href = href;
          }
        });
      });
    });
  });
};

const filterFunction = function () {
  const selectedValue = this.value;

  if (selectedValue === 'africa') {
    filterRegion(selectedValue);
  } else if (selectedValue === 'europe') {
    filterRegion(selectedValue);
  } else if (selectedValue === 'americas') {
    filterRegion(selectedValue);
  } else if (selectedValue === 'asia') {
    filterRegion(selectedValue);
  } else if (selectedValue === 'oceania') {
    filterRegion(selectedValue);
  } else if (selectedValue === 'region') {
    getCountryData();
  }
};

const switchTheme = function (theme) {
  const elements = [
    navListEl,
    body,
    main,
    detailsContainer,
    backBtn,
    searchBar,
    searchBtn,
    searchSection,
    bodyContainer,
  ];

  const isDarkMode = theme === 'dark';

  elements.forEach(el => {
    if (el) el.classList[isDarkMode ? 'add' : 'remove']('dark-mode');
  });

  document.querySelectorAll('.country-card').forEach(card => {
    card.classList[isDarkMode ? 'add' : 'remove']('dark-mode');
  });

  if (darkModeBtn) darkModeBtn.style.display = isDarkMode ? 'none' : 'block';
  if (lightModeBtn) lightModeBtn.style.display = isDarkMode ? 'block' : 'none';

  localStorage.setItem('theme', theme);
};

const switchDarkMode = () => switchTheme('dark');
const switchLightMode = () => switchTheme('light');

// Add theme initialization
const initializeTheme = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    switchDarkMode();
  } else {
    switchLightMode();
  }
};

// Event listeners
if (searchBtn) {
  searchBtn.addEventListener('click', handleSearch);
}
if (searchBar) {
  searchBar.addEventListener('keyup', e => {
    if (e.key === 'Enter') handleSearch();
  });
}

if (darkModeBtn) {
  darkModeBtn.addEventListener('click', switchDarkMode);
}
if (lightModeBtn) {
  lightModeBtn.addEventListener('click', switchLightMode);
}

filterEl.addEventListener('change', filterFunction);

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  if (main) getCountryData(); // Only call if on main page
});
