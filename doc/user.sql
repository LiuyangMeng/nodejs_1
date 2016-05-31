/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : nodedata

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-05-30 18:40:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `logtab`
-- ----------------------------
DROP TABLE IF EXISTS `logtab`;
CREATE TABLE `logtab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `oname` varchar(20) DEFAULT NULL,
  `otime` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of logtab
-- ----------------------------
INSERT INTO `logtab` VALUES ('19', 'test', '2016-05-30 15:19:27');
INSERT INTO `logtab` VALUES ('20', 'test', '2016-05-30 15:20:06');
INSERT INTO `logtab` VALUES ('21', 'test', '2016-05-30 15:23:13');
INSERT INTO `logtab` VALUES ('22', 'test', '2016-05-30 15:32:02');
INSERT INTO `logtab` VALUES ('23', 'test', '2016-05-30 15:38:11');
INSERT INTO `logtab` VALUES ('24', 'test', '2016-05-30 15:40:16');
INSERT INTO `logtab` VALUES ('25', 'Liuyang', '2016-05-30 15:46:21');
INSERT INTO `logtab` VALUES ('26', 'test', '2016-05-30 16:45:10');
INSERT INTO `logtab` VALUES ('31', 'test', '2016-05-30 18:11:39');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(12) DEFAULT NULL,
  `uage` int(5) DEFAULT NULL,
  `upass` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Liuyang', '23', 'LiuyangPass');
INSERT INTO `user` VALUES ('3', 'Yang', '21', 'Yang1011');
INSERT INTO `user` VALUES ('4', 'mi', '100', 'mi100');
INSERT INTO `user` VALUES ('6', 'Liuyang', '23', 'LiuyangPass');
INSERT INTO `user` VALUES ('7', 'Liuyang', '23', 'LiuyangPass');
INSERT INTO `user` VALUES ('8', 'Liuyang', '23', 'LiuyangPass');
INSERT INTO `user` VALUES ('9', 'Liuyang0', '0', 'LiuyangPass');
INSERT INTO `user` VALUES ('10', 'Liuyang10', '46', 'LiuyangPass');
INSERT INTO `user` VALUES ('11', '1', '1', '1');
INSERT INTO `user` VALUES ('16', 'Mneng7', '4', 'MengPass');
DROP TRIGGER IF EXISTS `bistu`;
DELIMITER ;;
CREATE TRIGGER `bistu` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
insert into logtab(oname,otime) values('test',sysdate());
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `aistu`;
DELIMITER ;;
CREATE TRIGGER `aistu` BEFORE DELETE ON `user` FOR EACH ROW BEGIN
insert into logtab(oname,otime) values(OLD.name,sysdate());
end
;;
DELIMITER ;
