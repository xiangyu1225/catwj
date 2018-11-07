DROP TABLE `test`.`new_table`;
CREATE TABLE `test`.`catbang` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `userid` VARCHAR(10) NOT NULL,
  `createTime` VARCHAR(20) NULL DEFAULT 'now()',
  PRIMARY KEY (`id`));

