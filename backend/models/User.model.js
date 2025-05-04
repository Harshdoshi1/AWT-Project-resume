 /**
 * User model schema definition
 * @typedef {Object} User
 * @property {string} uid - Firebase UID
 * @property {string} email - User's email
 * @property {string} displayName - User's display name
 * @property {boolean} emailVerified - Email verification status
 * @property {Date} createdAt - Account creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

class User {
    constructor(data) {
      this.uid = data.uid;
      this.email = data.email;
      this.displayName = data.displayName || '';
      this.emailVerified = data.emailVerified || false;
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    /**
     * Converts user data to Firestore document format
     * @returns {Object} Firestore document data
     */
    toFirestore() {
      return {
        uid: this.uid,
        email: this.email,
        displayName: this.displayName,
        emailVerified: this.emailVerified,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    }
  }
  
  module.exports = User;