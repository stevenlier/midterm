const { User } = require('../../../models');
/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get a list of users with pagination and filtering
 * @param {number} pageNumber 
 * @param {number} pageSize
 * @param {object} filters
 * @returns {Promise}
 */
async function getUsersWithPagination(pageNumber, pageSize, filters = {}, sort = {}) {
  const { name, email } = filters;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (email) {
    query.email = { $regex: email, $options: 'i' };
  }

  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / pageSize);
  const skip = (pageNumber - 1) * pageSize;

  const users = await User.find(query)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .select('id name email');

  return {
    page_number: pageNumber,
    page_size: pageSize,
    count: users.length,
    total_pages: totalPages,
    has_previous_page: pageNumber > 1,
    has_next_page: pageNumber < totalPages,
    data: users,
  };
}



/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  getUsersWithPagination,
};
