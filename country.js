'use strict';

// Get and display country details
const displayCountryDetails = function () {
  // Get country data from sessionStorage
  const countryData = JSON.parse(sessionStorage.getItem('selectedCountry'));

  // Guard clause for country data
  if (!countryData) {
    detailsContent.innerHTML = '<p class="error">No country data found</p>';
    return;
  }

  const html = `
      <img src="${
        countryData.flags.png
      }" alt="Country Flag" class="country-flag" />
      <div class="country-info2">
        <h2 class="country-name2">${countryData.name.common}</h2>
        <p><strong>Native Name:</strong> <span>${
          countryData.name.official
        }</span></p>
        <p><strong>Population:</strong> <span>${formatPopulation(
          countryData.population
        )}</span></p>
        <p><strong>Region:</strong> <span>${countryData.region}</span></p>
        <p><strong>Sub Region:</strong> <span>${
          countryData.subregion || 'N/A'
        }</span></p>
        <p><strong>Capital:</strong> <span>${
          countryData.capital || 'N/A'
        }</span></p>
        <p class="top-level-domain">
          <strong>Top Level Domain:</strong> <span>${
            countryData.tld?.[0] || 'N/A'
          }</span>
        </p>
        <p><strong>Currencies:</strong> <span>${
          Object.values(countryData.currencies)[0].name
        }</span></p>
        <p><strong>Languages:</strong> <span>${Object.values(
          countryData.languages
        ).join(', ')}</span></p>
        
        <p id="border-countries--p"><strong>Border Countries:</strong></p>
        <div class="border-countries">
        ${
          countryData.borders
            ? countryData.borders
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

  // Border buttons functionality
  const borderBtns = document.querySelectorAll('.border-countries-btn');
  if (borderBtns) {
    borderBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        detailsContent.innerHTML = '';
        fetch(`https://restcountries.com/v3.1/name/${btn.innerText}`)
          .then(response => {
            if (!response.ok)
              throw new Error(`Something went wrong (${response.status})`);

            return response.json();
          })
          .then(data => {
            data.forEach(item => {
              const html = `
            <img src="${
              item.flags.png
            }" alt="Country Flag" class="country-flag" />
            <div class="country-info2">
              <h2 class="country-name2">${item.name.common}</h2>
              <p><strong>Native Name:</strong> <span>${
                item.name.official
              }</span></p>
              <p><strong>Population:</strong> <span>${formatPopulation(
                item.population
              )}</span></p>
              <p><strong>Region:</strong> <span>${item.region}</span></p>
              <p><strong>Sub Region:</strong> <span>${
                item.subregion || 'N/A'
              }</span></p>
              <p><strong>Capital:</strong> <span>${
                item.capital || 'N/A'
              }</span></p>
              <p class="top-level-domain">
                <strong>Top Level Domain:</strong> <span>${
                  item.tld?.[0] || 'N/A'
                }</span>
              </p>
              <p><strong>Currencies:</strong> <span>${
                Object.values(item.currencies)[0].name
              }</span></p>
              <p><strong>Languages:</strong> <span>${Object.values(
                item.languages
              ).join(', ')}</span></p>
              
              <p id="border-countries--p"><strong>Border Countries:</strong></p>
              <div class="border-countries">
              ${
                item.borders
                  ? item.borders
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
            });
          });
      });
    });
  }
};

// Add event listener for when the page loads
document.addEventListener('DOMContentLoaded', displayCountryDetails);
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const switchTheme = function (theme) {
    const elements = [
      document.querySelector('.details-container'),
      document.querySelector('.body'),
      document.querySelector('.back-btn'),
    ];

    const isDarkMode = theme === 'dark';

    // Toggle dark mode for all elements
    elements.forEach(el => {
      if (el) el.classList[isDarkMode ? 'add' : 'remove']('dark-mode');
    });

    // Save theme preference
    localStorage.setItem('theme', theme);
  };

  const switchDarkMode = () => switchTheme('dark');
  const switchLightMode = () => switchTheme('light');

  savedTheme === 'dark' ? switchDarkMode() : switchLightMode();
});

// Back button functionality
backBtn?.addEventListener('click', () => {
  window.location.href = 'index.html';
});
