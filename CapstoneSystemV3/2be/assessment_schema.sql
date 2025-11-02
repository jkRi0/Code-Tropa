-- Assessment System Database Schema
-- This schema adds tables for storing pre-test and post-test assessments

-- Create assessments table to store test results
CREATE TABLE IF NOT EXISTS `assessments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `test_type` ENUM('pretest', 'posttest') NOT NULL,
  `language` VARCHAR(50) NOT NULL,
  `answers` TEXT NOT NULL COMMENT 'JSON array of user answers',
  `score` INT(3) NOT NULL COMMENT 'Score percentage (0-100)',
  `total_questions` INT(3) NOT NULL,
  `correct_answers` INT(3) NOT NULL,
  `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `test_type` (`test_type`),
  KEY `language` (`language`),
  CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add index for faster queries
CREATE INDEX idx_user_test_type ON assessments(user_id, test_type);
CREATE INDEX idx_user_language ON assessments(user_id, language);

-- Add column to users table to track if they've taken pre-test (if it doesn't exist)
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `has_taken_pretest` TINYINT(1) DEFAULT 0 COMMENT 'Whether user has completed pre-test',
ADD COLUMN IF NOT EXISTS `pretest_language` VARCHAR(50) DEFAULT NULL COMMENT 'Language selected for pre-test';

-- Create a view for easy access to latest assessment results
CREATE OR REPLACE VIEW `latest_assessments` AS
SELECT 
    a.*,
    u.username,
    u.email
FROM assessments a
INNER JOIN users u ON a.user_id = u.id
WHERE a.id IN (
    SELECT MAX(id)
    FROM assessments
    GROUP BY user_id, test_type, language
);

-- Sample queries for reference:

-- Get pre-test result for a specific user and language
-- SELECT * FROM assessments 
-- WHERE user_id = ? AND test_type = 'pretest' AND language = ?
-- ORDER BY completed_at DESC LIMIT 1;

-- Get post-test result for a specific user and language
-- SELECT * FROM assessments 
-- WHERE user_id = ? AND test_type = 'posttest' AND language = ?
-- ORDER BY completed_at DESC LIMIT 1;

-- Get all assessments for a user
-- SELECT * FROM assessments 
-- WHERE user_id = ? 
-- ORDER BY completed_at DESC;

-- Check if user has taken pre-test
-- SELECT has_taken_pretest FROM users WHERE id = ?;

-- Compare pre-test and post-test scores
-- SELECT 
--     pre.score AS pretest_score,
--     post.score AS posttest_score,
--     (post.score - pre.score) AS improvement
-- FROM 
--     (SELECT score FROM assessments WHERE user_id = ? AND test_type = 'pretest' AND language = ? ORDER BY completed_at DESC LIMIT 1) AS pre,
--     (SELECT score FROM assessments WHERE user_id = ? AND test_type = 'posttest' AND language = ? ORDER BY completed_at DESC LIMIT 1) AS post;






