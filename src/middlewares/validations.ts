const validateSearchParams = (req, res, next) => {
  const { userId, title } = req.query;

  if (!userId || !title) {
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

const validateUser = (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
      return res.status(400).json({ message: errorMessages.userIdRequired });
  }
  next();
}

const errorMessages = {
  titleRequired: 'User ID and title are required.',
  titleTooLong: 'Title is too long.',
  favoriteBoolean: 'Favorite must be a boolean value.',
  userIdRequired: 'User ID is required.',
};

export { validateSearchParams, validateFavorite, validateUser };