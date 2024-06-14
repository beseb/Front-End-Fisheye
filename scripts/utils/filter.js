import { handleLightbox } from '../utils/lightbox.js';

export function handleFilter(data) {
  const photographer = data.photographer;
  const filterSection = document.querySelector('.filter_section');
  const filterMenuButton = filterSection.querySelector('.btn_drop');
  const filterMenu = filterSection.querySelector('.dropdown_content');
  const filterButtons = Array.from(filterMenu.querySelectorAll('button'));

  // Sort medias by popularity by default
  const popularitySortedMedias = sortMedias(data.medias, 'likes');
  reorderMedias(popularitySortedMedias);

  // Add event listeners
  filterButtons.forEach((button) => {
    button.addEventListener('click', (e) =>
      handleFilterClick(e, data, photographer),
    );
  });

  filterMenuButton.addEventListener('click', toggleFilterMenu);
}

function handleFilterClick(e, data, photographer) {
  const newSelectedOption = e.target.value;
  updateDropdownTitle(newSelectedOption);
  const sortedMedias = sortMedias(data.medias, newSelectedOption);
  reorderMedias(sortedMedias);
  handleLightbox({ photographer, medias: sortedMedias });
  closeFilterMenu();
}

function sortMedias(medias, selectedOption) {
  return [...medias].sort((a, b) => {
    switch (selectedOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'likes':
        return b.likes - a.likes;
      case 'date':
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });
}

function reorderMedias(sortedMedias) {
  const mediasItems = document.querySelectorAll('.main__content__media__item');
  sortedMedias.forEach((sortedMedia, index) => {
    const mediaElement = Array.from(mediasItems).find(
      (media) => parseInt(media.dataset.id) === sortedMedia.id,
    );
    if (mediaElement) {
      mediaElement.style.order = index;
      mediaElement.setAttribute('data-order', index);
    }
  });
}

function updateDropdownTitle(option) {
  const filterButtonTitle = document.querySelector('.btn_drop_title');
  filterButtonTitle.textContent = getOptionTitle(option);
}

function getOptionTitle(option) {
  switch (option) {
    case 'title':
      return 'Titre';
    case 'likes':
      return 'Popularité';
    case 'date':
      return 'Date';
    default:
      return '';
  }
}

function toggleFilterMenu() {
  const filterMenuButton = document.querySelector('.btn_drop');
  const filterMenu = document.querySelector('.dropdown_content');
  const filterButtons = document.querySelectorAll('.dropdown_content button');

  const isExpanded =
    filterMenuButton.getAttribute('aria-expanded') === 'true' || false;
  filterMenuButton.setAttribute('aria-expanded', !isExpanded);
  filterMenu.classList.toggle('curtain_effect');
  document.querySelector('.fa-chevron-up').classList.toggle('rotate');

  const newAriaHiddenValue = filterMenu.classList.contains('curtain_effect')
    ? 'false'
    : 'true';
  filterMenu.setAttribute('aria-hidden', newAriaHiddenValue);

  const newTabIndexValue = filterMenu.classList.contains('curtain_effect')
    ? '0'
    : '-1';
  filterButtons.forEach((button) =>
    button.setAttribute('tabindex', newTabIndexValue),
  );
}

function closeFilterMenu() {
  const filterMenuButton = document.querySelector('.btn_drop');
  const filterMenu = document.querySelector('.dropdown_content');
  const filterButtons = document.querySelectorAll('.dropdown_content button');

  filterMenuButton.setAttribute('aria-expanded', 'false');
  filterMenu.classList.remove('curtain_effect');
  document.querySelector('.fa-chevron-up').classList.remove('rotate');

  filterMenu.setAttribute('aria-hidden', 'true');
  filterButtons.forEach((button) => button.setAttribute('tabindex', '-1'));
}
