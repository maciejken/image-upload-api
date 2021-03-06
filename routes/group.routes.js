const express = require('express');
const router = express.Router();

const { GroupSettings } = require('../config');
const { Regex } = require('../enum');
const upload = require('../middleware/upload');
const thumbnail = require('../middleware/thumbnail');
const readExif = require('../middleware/read-exif');
const { uploadField } = require('../config');
const uploadController = require('../controllers/upload.controller');
const CrudController = require('../controllers/crud.controller');
const groupController = new CrudController(GroupSettings);

const { verifyAdmin, verifyGroup, verifyToken, verifyUser } = require('../middleware/auth');
const check = require('../middleware/validation/check');
const {
  QueryCommon,
  NewGroupData,
  GroupData
} = require('../middleware/validation/schemas');

router.get(`/`, check(QueryCommon), verifyAdmin, groupController.getMany)
router.post(`/`, check(NewGroupData), verifyAdmin, groupController.create);
  
router.get(`/:id(${Regex.positiveInt})`, verifyGroup, groupController.getOne);
router.patch(`/:id(${Regex.positiveInt})`, check(GroupData), verifyAdmin, groupController.update);
router.delete(`/:id(${Regex.positiveInt})`, verifyAdmin, groupController.remove);

router.get(`/:id(${Regex.positiveInt})/users`, verifyAdmin, groupController.getUsers);
router.post(`/:id(${Regex.positiveInt})/users`, verifyAdmin, groupController.createUsers);
router.get(`/:id(${Regex.positiveInt})/users/:userId`, verifyAdmin, groupController.getUser);
router.delete(
  `/:id(${Regex.positiveInt})/users/:userId(${Regex.positiveInt})`,
  verifyAdmin,
  groupController.removeUser,
);

router.get(`/:id(${Regex.positiveInt})/details`, verifyGroup, groupController.getGroupDetails);
router.post(`/:id(${Regex.positiveInt})/details`, verifyGroup, groupController.createGroupDetails);
router.get(`/:id(${Regex.positiveInt})/details/:detailId`, verifyGroup, groupController.getGroupDetail);
router.patch(`/:id(${Regex.positiveInt})/details/:detailId`, verifyGroup, groupController.updateGroupDetail);
router.delete(`/:id(${Regex.positiveInt})/details/:detailId`, verifyGroup, groupController.removeGroupDetail);

router.post(`/:id(${Regex.positiveInt})/uploads`,
  verifyGroup,
  upload.array(uploadField),
  thumbnail,
  readExif,
  uploadController.createImages
);
router.get(`/:id(${Regex.positiveInt})/images`, verifyGroup, groupController.getImages);
router.get(`/:id(${Regex.positiveInt})/images/:filename`, verifyGroup, groupController.getImage);

module.exports = router;
