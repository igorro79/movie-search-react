const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error.message.includes('Cast to ObjectId failed')) {
    return res.status(404).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
};

module.exports = { asyncWrapper, errorHandler };
