/*
 * Handle likes
 * @param {Object} photographerContent - Photographer object
 */

export const handleLikes = (photographerContent) => {
  const totalLikesCount = document.querySelector('.photographer_likes_count');
  const mediasList = photographerContent.medias;

  // Calculate total likes at initialization
  let totalLikes = 0;
  mediasList.forEach((media) => {
    totalLikes += media.likes;
  });
  totalLikesCount.textContent = totalLikes;

  // Event listener to increment likes and total likes counter
  // On click on the number of likes
  const btnLikes = document.querySelectorAll(
    '.main__content__media__item__caption__likes-btn',
  );
  btnLikes.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.textContent = parseInt(e.target.dataset.likes) + 1;
      e.target.dataset.likes = e.target.textContent;
      totalLikesCount.textContent = parseInt(totalLikesCount.textContent) + 1;
    });
  });
  // On click on the heart icon
  const heartIcons = document.querySelectorAll('.fa-heart');
  heartIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const btn = icon.previousElementSibling;
      btn.textContent = parseInt(btn.dataset.likes) + 1;
      btn.dataset.likes = btn.textContent;
      totalLikesCount.textContent = parseInt(totalLikesCount.textContent) + 1;
    });
  });
};
