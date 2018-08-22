'use strict';

function get(req, res) {
  return res.json({ heath: 'ok' });
}

module.exports = {
  get
};
