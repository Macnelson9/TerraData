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
const countryCards = document.querySelectorAll('.country-card');

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

        main.insertAdjacentHTML('beforeend', html);
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

// Switch themes
const switchDarkMode = function () {
  navListEl.classList.add('dark-mode');
  body.classList.add('dark-mode');
  main.classList.add('dark-mode');
  countryCards.classList.add('dark-mode');
  detailsContainer.classList.add('dark-mode');
  backBtn.classList.add('dark-mode');
  searchBar.classList.add('dark-mode');
  searchBtn.classList.add('dark-mode');
  searchSection.classList.add('dark-mode');
};

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchBar.addEventListener('keyup', e => {
  if (e.key === 'Enter') handleSearch();
});
darkModeBtn.addEventListener('click', switchDarkMode);

getCountryData();
