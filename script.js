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

        // Add click event listener to all cards
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
    <div class="country-card ${country.name.common.toLowerCase()}">
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
    <img src="${this.flags.png}" alt="Country Flag" class="country-flag" />
    <div class="country-info2">
      <h2 class="country-name2">${this.name.common}</h2>
      <p><strong>Native Name:</strong> <span>${this.name.official}</span></p>
      <p><strong>Population:</strong> <span>${formatPopulation(
        this.population
      )}</span></p>
      <p><strong>Region:</strong> <span>${this.region}</span></p>
      <p><strong>Sub Region:</strong> <span>${
        this.subregion || 'N/A'
      }</span></p>
      <p><strong>Capital:</strong> <span>${this.capital || 'N/A'}</span></p>
      <p class="top-level-domain">
        <strong>Top Level Domain:</strong> <span>${
          this.tld?.[0] || 'N/A'
        }</span>
      </p>
      <p><strong>Currencies:</strong> <span>${
        Object.values(this.currencies)[0].name
      }</span></p>
      <p><strong>Languages:</strong> <span>${Object.values(this.languages).join(
        ', '
      )}</span></p>

      <p id="border-countries--p"><strong>Border Countries:</strong></p>
      <div class="border-countries">
        ${
          this.borders
            ? this.borders
                .map(
                  border =>
                    `<button class="border-countries-btn">${border}</button>`
                )
                .join('')
            : '<span>No border countries</span>'
        }
      </div>
    </div>`;

  detailsContent.innerHTML = html;
};

// Switch themes
const switchDarkMode = function () {
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

  elements.forEach(el => {
    if (el) el.classList.add('dark-mode');
  });

  // Update all country cards if they exist
  const countryCards = document.querySelectorAll('.country-card');
  countryCards.forEach(card => {
    card.classList.add('dark-mode');
  });

  // Hide dark mode button and show light mode button
  if (darkModeBtn) darkModeBtn.style.display = 'none';
  if (lightModeBtn) lightModeBtn.style.display = 'block';

  // Store theme preference
  localStorage.setItem('theme', 'dark');
};

const switchLightMode = function () {
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

  elements.forEach(el => {
    if (el) el.classList.remove('dark-mode');
  });

  // Update all country cards if they exist
  const countryCards = document.querySelectorAll('.country-card');
  countryCards.forEach(card => {
    card.classList.remove('dark-mode');
  });

  // Hide light mode button and show dark mode button
  if (lightModeBtn) lightModeBtn.style.display = 'none';
  if (darkModeBtn) darkModeBtn.style.display = 'block';

  // Store theme preference
  localStorage.setItem('theme', 'light');
};

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
searchBtn.addEventListener('click', handleSearch);
searchBar.addEventListener('keyup', e => {
  if (e.key === 'Enter') handleSearch();
});

if (darkModeBtn) {
  darkModeBtn.addEventListener('click', switchDarkMode);
}
if (lightModeBtn) {
  lightModeBtn.addEventListener('click', switchLightMode);
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme);

// switchLightMode();
getCountryData();
