'use strict';
/**
 * @file Model for a temporary token
 *
 * Temporary tokens holds datas about request tokens and temporary Cluestr code, while waiting for the user to consent on dropbox site.
 */
var mongoose = require('mongoose');

var TempTokenSchema = new mongoose.Schema({
  // Authorization code to communicate with Cluestr
  cluestrToken: '',

  // Request tokens to be traded for accesTokens
  dropboxTokens: {},

});

// Register & export the model
module.exports = mongoose.model('TempToken', TempTokenSchema);