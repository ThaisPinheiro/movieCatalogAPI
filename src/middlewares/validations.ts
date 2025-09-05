const validateSearchParams = (req, res, next) => {
  const { title } = req.query;

  if (!title) {
      return res.status(400).json({ message: errorMessages.titleRequired });
  }

  if (title.length > 50) {
      return res.status(400).json({ message: errorMessages.titleTooLong });
  }
  next();
}

const validateFavorite = (req, res, next) => {
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean' ) {
      return res.status(400).json({ message: errorMessages.favoriteBoolean });
  }
  next();
}

const errorMessages = {
  titleRequired: 'User ID and title are required.',
  titleTooLong: 'Title is too long.',
  favoriteBoolean: 'Favorite must be a boolean value.',
};

export { validateSearchParams, validateFavorite };