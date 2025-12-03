# Assessment System - Code-Tropa

## Overview
This comprehensive assessment system provides pre-test and post-test functionality to measure student learning progress in programming languages (Java, C++, C#).

## Features

### 1. **Pre-Test Assessment**
- Triggered automatically after user signup
- Language selection (Java, C++, C#)
- Comprehensive questions covering 7 topics:
  - Basic Syntax, Code Structure, and Comments
  - Variables and Data Types
  - Operators and Expressions
  - Control Flow (Conditional and Looping Statements)
  - String Operations
  - Arrays
  - Methods / Functions
- 35 questions per language (5 per topic)
- Stores results in database
- Can be skipped and taken later

### 2. **Post-Test Assessment**
- Unlocked only after completing ALL Story Mode episodes (7 episodes) for the selected language
- Same question format as pre-test
- Measures learning improvement
- Compares against pre-test baseline

### 3. **Progress Comparison**
- Visual comparison of pre-test vs post-test scores
- Shows improvement percentage
- Performance level indicators
- Motivational feedback messages

## File Structure

```
asmt/
├── index.html              # Language selection & pre-test check
├── pretest.html           # Pre-test assessment page
├── posttest.html          # Post-test assessment page
├── result.html            # Individual test results display
├── comparison.html        # Pre-test vs Post-test comparison
├── questions.js           # Question bank for all languages
└── README.md             # This file
```

## Backend Files

```
2be/
├── assessment_schema.sql       # Database schema
├── check_pretest.php          # Check if user took pre-test
├── submit_pretest.php         # Handle pre-test submission
├── submit_posttest.php        # Handle post-test submission
├── get_assessment_results.php # Retrieve assessment data
└── check_story_completion.php # Verify episode completion
```

## Database Schema

### Table: `assessments`
Stores all assessment results:
- `id` - Primary key
- `user_id` - Foreign key to users table
- `test_type` - 'pretest' or 'posttest'
- `language` - Programming language
- `answers` - JSON array of user answers
- `score` - Percentage score (0-100)
- `total_questions` - Number of questions
- `correct_answers` - Number correct
- `completed_at` - Timestamp

### Updated `users` table columns:
- `has_taken_pretest` - Boolean flag
- `pretest_language` - Selected language for pre-test

## Setup Instructions

### 1. Database Setup
Run the SQL schema to create necessary tables:
```bash
mysql -u your_username -p your_database < 2be/assessment_schema.sql
```

### 2. Verify Dependencies
Ensure these files exist:
- `2be/db.php` - Database connection
- User session management is working

### 3. Test the Flow

**New User Flow:**
1. Sign up → Redirects to `asmt/index.html`
2. Select language → Takes pre-test
3. View results → Redirected to homepage
4. Complete Story Mode episodes
5. Take post-test from homepage button or `asmt/posttest.html`
6. View comparison in `asmt/comparison.html`

**Existing User Flow:**
- Can access post-test via homepage bottom-right button
- Can view progress comparison anytime

## Question Bank

Each language has **35 questions** covering 7 topics (5 questions per topic):

### Topics Covered:
1. **Basic Syntax & Code Structure** - Comments, file structure, entry points
2. **Variables & Data Types** - Declarations, primitive types, constants
3. **Operators & Expressions** - Arithmetic, logical, comparison operators
4. **Control Flow** - if/else, switch, loops, break/continue
5. **String Operations** - Length, concatenation, substring, case conversion
6. **Arrays** - Declaration, initialization, indexing, bounds
7. **Methods/Functions** - Declaration, parameters, return types, calling

## Access Points

### From Homepage:
- **Post-Test Button** - Bottom-right info container
  - Shows welcome message
  - Displays current language
  - "Take Post-Test" button (checks completion status)

### Direct URLs:
- Pre-Test: `/asmt/index.html`
- Post-Test: `/asmt/posttest.html`
- Comparison: `/asmt/comparison.html`

## Features & Validation

### Pre-Test:
✅ Can be taken immediately after signup  
✅ Can be skipped  
✅ Language selection persists  
✅ Results stored permanently  

### Post-Test:
✅ Locked until ALL episodes completed  
✅ Shows completion progress  
✅ Provides clear feedback  
✅ Can be retaken  

### Security:
✅ Session-based authentication  
✅ User ID validation  
✅ SQL injection prevention  
✅ Input sanitization  

## Responsive Design

All assessment pages are fully responsive:
- **Desktop**: Optimal layout with side-by-side options
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Stacked layout, touch-friendly buttons

## Scoring System

- **Excellent**: 90-100% (Green indicator)
- **Good**: 75-89% (Blue indicator)
- **Average**: 60-74% (Yellow indicator)
- **Needs Improvement**: 0-59% (Red indicator)

## Future Enhancements

Potential improvements:
- [ ] Question randomization per attempt
- [ ] Time limit per question
- [ ] Detailed answer explanations
- [ ] Topic-based performance breakdown
- [ ] Leaderboard for highest improvements
- [ ] Export results as PDF
- [ ] Email results to user

## Troubleshooting

### Common Issues:

**1. Pre-test not showing after signup**
- Check if `signup.php` redirects to `/asmt/index.html`
- Verify session is properly initialized

**2. Post-test shows "Locked" even after completing episodes**
- Verify `story_progress` table has 7 completed entries for the language
- Check `check_story_completion.php` response

**3. Scores not saving**
- Check database connection in `db.php`
- Verify `assessments` table exists
- Check PHP error logs

**4. Language not displaying**
- Ensure `localStorage.setItem('selectedLanguage', ...)` is called
- Check browser console for errors

## Support

For issues or questions:
1. Check browser console for JavaScript errors
2. Check PHP error logs for backend issues
3. Verify database connectivity
4. Ensure all files have proper permissions

## Credits

Assessment System developed for Code-Tropa Learning Platform
- **Questions**: Comprehensive coverage of programming fundamentals
- **Design**: Matches Code-Tropa's brown/gold theme
- **Responsive**: Mobile-first approach





