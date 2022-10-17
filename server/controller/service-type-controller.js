const serviceTypesDao = require('../dao/ServiceType.dao');

async function getAll(req, res) {
  try {
    const serviceTypes = await serviceTypesDao.queryServiceType();
    return res.status(200).json(serviceTypes);
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
    getAll
}