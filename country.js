'use strict';

const borderBtns = document.querySelectorAll('.border-countries-btn');

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
};

// Add event listener for when the page loads
document.addEventListener('DOMContentLoaded', displayCountryDetails);

// Back button functionality
backBtn?.addEventListener('click', () => {
  window.location.href = 'index.html';
});
