const express = require('express');
const { Register, login, logOut, followUser,viewAllProfile, viewProfile, viewMyPosts,
updateProfile, updatePassword, deleteProfile, viewMyProfile, forgotPassword, resetPassword} = require('../Controller/User');
const { isAuthenticated } = require('../Middlewares/Auth');

const router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(login)

router.route('/logout').get(logOut);

router.route('/follow/:id').get(isAuthenticated, followUser);

router.route('/update/password').put(isAuthenticated, updatePassword);

router.route('/update/profile').put(isAuthenticated, updateProfile);

router.route('/delete/profile').delete(isAuthenticated, deleteProfile);

router.route('/view/myprofile').get(isAuthenticated, viewMyProfile);

router.route('/view/profile/:id').get(isAuthenticated, viewProfile);

router.route('/view/allprofile').get(isAuthenticated, viewAllProfile);

router.route('/view/myPosts').get(isAuthenticated, viewMyPosts);

router.route('/forgot/password').post(forgotPassword);

router.route('/reset/password/:id').put(resetPassword);

module.exports = router;