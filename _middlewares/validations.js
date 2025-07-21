const validateSearchParams = (req, res, next) => {
  const { userId, title } = req.query;

  if (!userId || !title) {
      return res.status(400).json({ message: 'User ID and title are required.' });
  }

  if (title.length > 50) {
      return res.status(400).json({ message: 'Title is too long.' });
  }
  next();
}

const validateFavorite = (req, res, next) => {
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean' ) {
      return res.status(400).json({ message: 'Favorite must be a boolean value.' });
  }
  next();
}

const validateUser = (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
  }
}

module.exports = { validateSearchParams, validateFavorite, validateUser };