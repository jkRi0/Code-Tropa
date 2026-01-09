<?php
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$prevDisplayErrors = ini_get('display_errors');
ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

$response = [
    'success' => false,
    'recommendations' => [],
    'message' => 'Unknown error'
];

$userId = $_SESSION['user_id'] ?? ($_SESSION['userData']['USERS']['id'] ?? null);
if ($userId === null) {
    $response['message'] = 'Unauthorized';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

if (!isset($conn) || !$conn) {
    $response['message'] = 'Database connection not available';
    echo json_encode($response);
    ini_set('display_errors', $prevDisplayErrors);
    exit;
}

// Get user's selected language
$language = $_SESSION['selectedLanguage'] ?? 
            ($_SESSION['userData']['USERS']['programmingLanguage'] ?? 'java');

// Get comprehensive performance data with trends
$sql = "SELECT 
            AVG(accuracy)   AS avgAccuracy,
            AVG(efficiency) AS avgEfficiency,
            AVG(readability) AS avgReadability,
            AVG(timeTaken)  AS avgTimeTaken,
            COUNT(*)        AS totalAttempts,
            MIN(accuracy)   AS minAccuracy,
            MAX(accuracy)   AS maxAccuracy,
            STDDEV(accuracy) AS stdAccuracy,
            MIN(efficiency) AS minEfficiency,
            MAX(efficiency) AS maxEfficiency,
            STDDEV(efficiency) AS stdEfficiency,
            MIN(readability) AS minReadability,
            MAX(readability) AS maxReadability,
            STDDEV(readability) AS stdReadability,
            MIN(timeTaken) AS minTimeTaken,
            MAX(timeTaken) AS maxTimeTaken,
            STDDEV(timeTaken) AS stdTimeTaken
        FROM performance
        WHERE userId = ?";

$accuracy = 0;
$efficiency = 0;
$readability = 0;
$timeTaken = 0;
$totalAttempts = 0;
$minAccuracy = 0;
$maxAccuracy = 0;
$stdAccuracy = 0;
$minEfficiency = 0;
$maxEfficiency = 0;
$stdEfficiency = 0;
$minReadability = 0;
$maxReadability = 0;
$stdReadability = 0;
$minTimeTaken = 0;
$maxTimeTaken = 0;
$stdTimeTaken = 0;

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('i', $userId);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $accuracy = round(floatval($row['avgAccuracy'] ?? 0), 2);
            $efficiency = round(floatval($row['avgEfficiency'] ?? 0), 2);
            $readability = round(floatval($row['avgReadability'] ?? 0), 2);
            $timeTaken = round(floatval($row['avgTimeTaken'] ?? 0), 2);
            $totalAttempts = intval($row['totalAttempts'] ?? 0);
            $minAccuracy = round(floatval($row['minAccuracy'] ?? 0), 2);
            $maxAccuracy = round(floatval($row['maxAccuracy'] ?? 0), 2);
            $stdAccuracy = round(floatval($row['stdAccuracy'] ?? 0), 2);
            $minEfficiency = round(floatval($row['minEfficiency'] ?? 0), 2);
            $maxEfficiency = round(floatval($row['maxEfficiency'] ?? 0), 2);
            $stdEfficiency = round(floatval($row['stdEfficiency'] ?? 0), 2);
            $minReadability = round(floatval($row['minReadability'] ?? 0), 2);
            $maxReadability = round(floatval($row['maxReadability'] ?? 0), 2);
            $stdReadability = round(floatval($row['stdReadability'] ?? 0), 2);
            $minTimeTaken = round(floatval($row['minTimeTaken'] ?? 0), 2);
            $maxTimeTaken = round(floatval($row['maxTimeTaken'] ?? 0), 2);
            $stdTimeTaken = round(floatval($row['stdTimeTaken'] ?? 0), 2);
        }
    }
    $stmt->close();
}

// Get recent performance (last 10 attempts) vs overall for trend analysis
$sqlRecent = "SELECT 
            AVG(accuracy)   AS recentAccuracy,
            AVG(efficiency) AS recentEfficiency,
            AVG(readability) AS recentReadability,
            AVG(timeTaken)  AS recentTimeTaken
        FROM (
            SELECT accuracy, efficiency, readability, timeTaken
            FROM performance
            WHERE userId = ?
            ORDER BY id DESC
            LIMIT 10
        ) AS recent";

$recentAccuracy = 0;
$recentEfficiency = 0;
$recentReadability = 0;
$recentTimeTaken = 0;

if ($stmt = $conn->prepare($sqlRecent)) {
    $stmt->bind_param('i', $userId);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $recentAccuracy = round(floatval($row['recentAccuracy'] ?? 0), 2);
            $recentEfficiency = round(floatval($row['recentEfficiency'] ?? 0), 2);
            $recentReadability = round(floatval($row['recentReadability'] ?? 0), 2);
            $recentTimeTaken = round(floatval($row['recentTimeTaken'] ?? 0), 2);
        }
    }
    $stmt->close();
}

// Get performance by difficulty level with all metrics
$sqlDifficulty = "SELECT 
            p.difficulty,
            AVG(perf.accuracy) AS avgAccuracy,
            AVG(perf.efficiency) AS avgEfficiency,
            AVG(perf.readability) AS avgReadability,
            AVG(perf.timeTaken) AS avgTimeTaken,
            COUNT(*) AS attempts
        FROM performance perf
        JOIN progress p ON perf.progressId = p.id
        WHERE perf.userId = ? AND p.language = ?
        GROUP BY p.difficulty
        ORDER BY 
            CASE p.difficulty
                WHEN 'easy' THEN 1
                WHEN 'medium' THEN 2
                WHEN 'hard' THEN 3
                ELSE 4
            END";

$difficultyPerformance = [];
if ($stmt = $conn->prepare($sqlDifficulty)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $difficultyPerformance[$row['difficulty']] = [
                'accuracy' => round(floatval($row['avgAccuracy'] ?? 0), 2),
                'efficiency' => round(floatval($row['avgEfficiency'] ?? 0), 2),
                'readability' => round(floatval($row['avgReadability'] ?? 0), 2),
                'timeTaken' => round(floatval($row['avgTimeTaken'] ?? 0), 2),
                'attempts' => intval($row['attempts'] ?? 0)
            ];
        }
    }
    $stmt->close();
}

// Get performance by type (story vs challenge)
$sqlType = "SELECT 
            p.type,
            AVG(perf.accuracy) AS avgAccuracy,
            AVG(perf.efficiency) AS avgEfficiency,
            AVG(perf.readability) AS avgReadability,
            COUNT(*) AS attempts
        FROM performance perf
        JOIN progress p ON perf.progressId = p.id
        WHERE perf.userId = ? AND p.language = ?
        GROUP BY p.type";

$typePerformance = [];
if ($stmt = $conn->prepare($sqlType)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $typePerformance[$row['type']] = [
                'accuracy' => round(floatval($row['avgAccuracy'] ?? 0), 2),
                'efficiency' => round(floatval($row['avgEfficiency'] ?? 0), 2),
                'readability' => round(floatval($row['avgReadability'] ?? 0), 2),
                'attempts' => intval($row['attempts'] ?? 0)
            ];
        }
    }
    $stmt->close();
}

// Get progress data to identify weak areas
$sql = "SELECT type, language, chapter, episode, difficulty, level, points 
        FROM progress 
        WHERE userId = ? AND language = ? 
        ORDER BY points ASC 
        LIMIT 10";

$weakAreas = [];
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('is', $userId, $language);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            if (intval($row['points']) < 80) {
                $weakAreas[] = $row;
            }
        }
    }
    $stmt->close();
}

$recommendations = [];

// Calculate trends (improving, declining, or stable) for all metrics
$accuracyTrend = 'stable';
$efficiencyTrend = 'stable';
$readabilityTrend = 'stable';

if ($totalAttempts >= 10 && $recentAccuracy > 0) {
    $accuracyDiff = $recentAccuracy - $accuracy;
    if ($accuracyDiff > 5) {
        $accuracyTrend = 'improving';
    } else if ($accuracyDiff < -5) {
        $accuracyTrend = 'declining';
    }
    
    $efficiencyDiff = $recentEfficiency - $efficiency;
    if ($efficiencyDiff > 5) {
        $efficiencyTrend = 'improving';
    } else if ($efficiencyDiff < -5) {
        $efficiencyTrend = 'declining';
    }
    
    $readabilityDiff = $recentReadability - $readability;
    if ($readabilityDiff > 5) {
        $readabilityTrend = 'improving';
    } else if ($readabilityDiff < -5) {
        $readabilityTrend = 'declining';
    }
}

// Calculate consistency (low std dev = consistent, high = inconsistent)
$accuracyConsistent = ($stdAccuracy < 15 && $totalAttempts >= 5);
$efficiencyConsistent = ($stdEfficiency < 15 && $totalAttempts >= 5);
$readabilityConsistent = ($stdReadability < 15 && $totalAttempts >= 5);

// Calculate coefficient of variation for better consistency measure
$accuracyCV = ($accuracy > 0 && $totalAttempts >= 5) ? ($stdAccuracy / $accuracy) * 100 : 0;
$efficiencyCV = ($efficiency > 0 && $totalAttempts >= 5) ? ($stdEfficiency / $efficiency) * 100 : 0;
$readabilityCV = ($readability > 0 && $totalAttempts >= 5) ? ($stdReadability / $readability) * 100 : 0;

// Analyze Accuracy with trend and consistency
if ($accuracy < 70) {
    $trendNote = '';
    if ($accuracyTrend === 'improving') {
        $trendNote = ' Good news: Your recent accuracy is improving!';
    } else if ($accuracyTrend === 'declining') {
        $trendNote = ' Warning: Your accuracy has been declining recently.';
    }
    
    $consistencyNote = '';
    if (!$accuracyConsistent && $totalAttempts >= 5) {
        $consistencyNote = ' Your performance is inconsistent (ranging from ' . $minAccuracy . '% to ' . $maxAccuracy . '%).';
    }
    
    $description = 'Your average code accuracy is ' . $accuracy . '%, which is below the 70% threshold.';
    if ($totalAttempts < 5) {
        $description .= ' You have limited data (' . $totalAttempts . ' attempts), so keep practicing to get more accurate insights.';
    } else {
        $description .= $trendNote . $consistencyNote;
    }
    $description .= ' Focus on understanding problem requirements thoroughly.';
    
    $recommendations[] = [
        'category' => 'Accuracy',
        'priority' => 'high',
        'title' => 'Improve Code Accuracy',
        'description' => $description,
        'exercises' => [
            'Practice reading problem statements carefully and identifying all requirements',
            'Work on debugging exercises to find and fix errors',
            'Complete "Variable Declaration" and "Data Types" challenges in Story Mode',
            'Try re-attempting challenges where you scored below 80 points'
        ],
        'hints' => [
            'Always test your code with different input values before submitting',
            'Read the problem statement at least twice to catch all requirements',
            'Check for edge cases (empty inputs, boundary values, null cases)',
            'Use print statements or debugger to trace your code execution'
        ],
        'studyMaterials' => [
            'Review: Basic Syntax and Data Types in ' . strtoupper($language),
            'Study: Common Programming Errors and How to Avoid Them',
            'Watch: Debugging Techniques Tutorial',
            'Read: Problem-Solving Strategies for Beginners'
        ]
    ];
} else if ($accuracy < 85) {
    $trendNote = '';
    if ($accuracyTrend === 'improving') {
        $trendNote = ' Your recent performance shows improvement - keep it up!';
    } else if ($accuracyTrend === 'declining') {
        $trendNote = ' Your accuracy has been declining - review recent mistakes.';
    }
    
    $description = 'Your accuracy is ' . $accuracy . '%, which is good but can be improved.' . $trendNote . ' Review edge cases and practice debugging.';
    
    $recommendations[] = [
        'category' => 'Accuracy',
        'priority' => 'medium',
        'title' => 'Enhance Code Accuracy',
        'description' => $description,
        'exercises' => [
            'Practice with medium-difficulty challenges focusing on edge cases',
            'Review your failed attempts and understand what went wrong',
            'Try solving problems without looking at hints first'
        ],
        'hints' => [
            'Always consider boundary conditions in your solutions',
            'Test with zero, negative, and maximum values',
            'Double-check your logic before submitting'
        ],
        'studyMaterials' => [
            'Advanced Debugging Techniques',
            'Edge Case Testing Strategies',
            'Code Review Best Practices'
        ]
    ];
}

// Analyze Efficiency with trend and difficulty-specific insights
if ($efficiency < 70) {
    $trendNote = '';
    if ($efficiencyTrend === 'improving') {
        $trendNote = ' Your recent efficiency is improving!';
    } else if ($efficiencyTrend === 'declining') {
        $trendNote = ' Your efficiency has been declining recently.';
    }
    
    $difficultyNote = '';
    if (!empty($difficultyPerformance)) {
        $weakDifficulties = [];
        foreach ($difficultyPerformance as $diff => $perf) {
            if ($perf['efficiency'] < 70 && $perf['attempts'] >= 2) {
                $weakDifficulties[] = $diff;
            }
        }
        if (!empty($weakDifficulties)) {
            $difficultyNote = ' You particularly struggle with ' . implode(' and ', $weakDifficulties) . ' challenges.';
        }
    }
    
    $description = 'Your average code efficiency is ' . $efficiency . '%, which needs improvement.' . $trendNote . $difficultyNote . ' Learn about algorithms and data structures.';
    
    $recommendations[] = [
        'category' => 'Efficiency',
        'priority' => 'high',
        'title' => 'Optimize Code Efficiency',
        'description' => $description,
        'exercises' => [
            'Practice with "Loops and Arrays" challenges in Story Mode',
            'Complete "Algorithm Optimization" exercises',
            'Try solving problems using different data structures (arrays, lists, maps)',
            'Practice time complexity analysis exercises'
        ],
        'hints' => [
            'Avoid nested loops when a single loop would work',
            'Use appropriate data structures (HashMap for O(1) lookups)',
            'Consider the time complexity before implementing your solution',
            'Look for patterns that can reduce computational steps'
        ],
        'studyMaterials' => [
            'Study: Time and Space Complexity Analysis',
            'Learn: Common Data Structures (' . strtoupper($language) . ')',
            'Read: Algorithm Optimization Techniques',
            'Practice: Big O Notation Exercises'
        ]
    ];
} else if ($efficiency < 85) {
    $recommendations[] = [
        'category' => 'Efficiency',
        'priority' => 'medium',
        'title' => 'Boost Code Efficiency',
        'description' => 'Your efficiency is decent. Try to reduce unnecessary operations and optimize loops.',
        'exercises' => [
            'Practice refactoring your existing solutions to be more efficient',
            'Compare your solutions with optimal solutions',
            'Work on challenges that focus on performance'
        ],
        'hints' => [
            'Remove redundant calculations and store results in variables',
            'Use early returns to avoid unnecessary processing',
            'Consider caching frequently computed values'
        ],
        'studyMaterials' => [
            'Code Optimization Patterns',
            'Performance Tuning Guide',
            'Efficient Algorithm Design'
        ]
    ];
}

// Analyze Readability with trend and consistency
if ($readability < 70) {
    $trendNote = '';
    if ($readabilityTrend === 'improving') {
        $trendNote = ' Your recent readability is improving!';
    } else if ($readabilityTrend === 'declining') {
        $trendNote = ' Your readability has been declining recently.';
    }
    
    $consistencyNote = '';
    if (!$readabilityConsistent && $totalAttempts >= 5) {
        $consistencyNote = ' Your readability varies significantly (ranging from ' . $minReadability . '% to ' . $maxReadability . '%).';
    }
    
    $description = 'Your average code readability is ' . $readability . '%, which is below the 70% threshold.' . $trendNote . $consistencyNote . ' Focus on clean code principles and proper formatting.';
    
    $recommendations[] = [
        'category' => 'Readability',
        'priority' => 'high',
        'title' => 'Improve Code Readability',
        'description' => $description,
        'exercises' => [
            'Practice writing code with meaningful variable names',
            'Complete "Code Formatting" exercises',
            'Refactor your previous solutions to improve readability',
            'Practice adding comments to explain complex logic'
        ],
        'hints' => [
            'Use descriptive variable names (e.g., "userAge" instead of "ua")',
            'Add comments for complex algorithms or business logic',
            'Follow consistent indentation and spacing',
            'Break long functions into smaller, focused functions',
            'Use whitespace to separate logical sections'
        ],
        'studyMaterials' => [
            'Read: Clean Code Principles by Robert C. Martin',
            'Study: Code Style Guidelines for ' . strtoupper($language),
            'Learn: Naming Conventions Best Practices',
            'Watch: Writing Maintainable Code Tutorial'
        ]
    ];
} else if ($readability < 85) {
    $trendNote = '';
    if ($readabilityTrend === 'improving') {
        $trendNote = ' Your readability is improving - keep it up!';
    } else if ($readabilityTrend === 'declining') {
        $trendNote = ' Your readability has been declining - focus on maintaining clean code.';
    }
    
    $description = 'Your code readability is ' . $readability . '%, which is good but can be improved.' . $trendNote . ' Consider adding more comments and breaking complex functions.';
    
    $recommendations[] = [
        'category' => 'Readability',
        'priority' => 'medium',
        'title' => 'Enhance Code Readability',
        'description' => $description,
        'exercises' => [
            'Practice writing self-documenting code',
            'Refactor complex functions into smaller ones',
            'Add documentation comments to your code'
        ],
        'hints' => [
            'Each function should do one thing well',
            'Use comments to explain "why", not "what"',
            'Keep functions short (ideally under 20 lines)'
        ],
        'studyMaterials' => [
            'Function Design Principles',
            'Code Documentation Standards',
            'Refactoring Techniques'
        ]
    ];
}

// Analyze performance patterns and correlations
$patternAnalysis = [];
$correlationInsights = [];

if (!empty($difficultyPerformance)) {
    // Check if user struggles more with harder challenges
    $easyAcc = $difficultyPerformance['easy']['accuracy'] ?? 0;
    $mediumAcc = $difficultyPerformance['medium']['accuracy'] ?? 0;
    $hardAcc = $difficultyPerformance['hard']['accuracy'] ?? 0;
    
    if ($hardAcc > 0 && $hardAcc < 60 && ($mediumAcc > $hardAcc + 15 || $easyAcc > $hardAcc + 20)) {
        $patternAnalysis[] = 'You struggle significantly more with hard challenges. Consider building up from medium difficulty.';
    }
    
    // Check if user does well on easy but poorly on medium/hard
    if ($easyAcc >= 80 && $mediumAcc < 70) {
        $patternAnalysis[] = 'You excel at easy challenges but need more practice with medium difficulty problems.';
    }
    
    // Check efficiency patterns by difficulty
    $easyEff = $difficultyPerformance['easy']['efficiency'] ?? 0;
    $mediumEff = $difficultyPerformance['medium']['efficiency'] ?? 0;
    $hardEff = $difficultyPerformance['hard']['efficiency'] ?? 0;
    
    if ($hardEff > 0 && $hardEff < $easyEff - 20) {
        $patternAnalysis[] = 'Your efficiency drops significantly on harder challenges - focus on algorithm optimization.';
    }
}

// Analyze correlation between metrics
if ($totalAttempts >= 5) {
    // High accuracy but low efficiency = needs optimization
    if ($accuracy >= 80 && $efficiency < 70) {
        $correlationInsights[] = 'You write correct code but it\'s not optimized. Focus on learning efficient algorithms.';
    }
    
    // High efficiency but low accuracy = needs debugging skills
    if ($efficiency >= 80 && $accuracy < 70) {
        $correlationInsights[] = 'Your code is efficient but has correctness issues. Improve your debugging and testing skills.';
    }
    
    // Low readability affects other metrics
    if ($readability < 60 && ($accuracy < 75 || $efficiency < 75)) {
        $correlationInsights[] = 'Poor code readability may be affecting your accuracy and efficiency. Clean code is easier to debug and optimize.';
    }
}

// Analyze type-specific performance
if (!empty($typePerformance)) {
    $storyAcc = $typePerformance['story']['accuracy'] ?? 0;
    $challengeAcc = $typePerformance['challenge']['accuracy'] ?? 0;
    
    if ($storyAcc > 0 && $challengeAcc > 0) {
        $accDiff = abs($storyAcc - $challengeAcc);
        if ($accDiff > 15) {
            if ($storyAcc > $challengeAcc) {
                $patternAnalysis[] = 'You perform better in Story Mode than Challenge Mode. Try applying Story Mode concepts to challenges.';
            } else {
                $patternAnalysis[] = 'You perform better in Challenge Mode. Review Story Mode content to strengthen fundamentals.';
            }
        }
    }
}

// Weak Areas Analysis with pattern insights
if (count($weakAreas) > 0) {
    $weakTypes = [];
    $weakByType = ['story' => [], 'challenge' => []];
    foreach ($weakAreas as $area) {
        if ($area['type'] === 'story') {
            $weakTypes[] = "Chapter {$area['chapter']}, Episode {$area['episode']}";
            $weakByType['story'][] = $area;
        } else {
            $weakTypes[] = "Level {$area['level']} ({$area['difficulty']})";
            $weakByType['challenge'][] = $area;
        }
    }
    
    $description = 'You have ' . count($weakAreas) . ' challenge(s) with scores below 80 points.';
    if (count($weakByType['story']) > count($weakByType['challenge'])) {
        $description .= ' Most are in Story Mode - review the learning content for those chapters.';
    } else if (count($weakByType['challenge']) > count($weakByType['story'])) {
        $description .= ' Most are in Challenge Mode - practice similar problems to strengthen these concepts.';
    }
    if (!empty($patternAnalysis)) {
        $description .= ' ' . implode(' ', array_slice($patternAnalysis, 0, 2));
    }
    if (!empty($correlationInsights)) {
        $description .= ' ' . implode(' ', array_slice($correlationInsights, 0, 1));
    }
    
    $recommendations[] = [
        'category' => 'Weak Areas',
        'priority' => 'high',
        'title' => 'Focus on Weak Areas',
        'description' => $description,
        'exercises' => [
            'Re-attempt: ' . implode(', ', array_slice($weakTypes, 0, 5)),
            'Review the solutions and understand what you missed',
            'Practice similar problems to strengthen these concepts',
            'Complete related Story Mode episodes for better understanding'
        ],
        'hints' => [
            'Don\'t skip difficult topics - practice them more',
            'Review the learning materials for these specific areas',
            'Ask for help or look up explanations if stuck',
            'Practice makes perfect - keep trying!'
        ],
        'studyMaterials' => [
            'Review Story Mode content for weak chapters',
            'Study challenge solutions and explanations',
            'Practice exercises related to your weak areas',
            'Watch tutorial videos for difficult concepts'
        ]
    ];
}

// Add correlation-based recommendations
if (!empty($correlationInsights) && count($recommendations) < 5) {
    foreach (array_slice($correlationInsights, 0, 2) as $insight) {
        $recommendations[] = [
            'category' => 'Performance Insight',
            'priority' => 'medium',
            'title' => 'Performance Pattern Detected',
            'description' => $insight,
            'exercises' => [
                'Focus on the specific area mentioned in the insight',
                'Review your recent code submissions',
                'Compare your approach with optimal solutions'
            ],
            'hints' => [
                'Pay attention to the relationship between different coding metrics',
                'Work on balancing all aspects of code quality'
            ],
            'studyMaterials' => [
                'Code Quality Best Practices',
                'Balancing Speed, Accuracy, and Efficiency'
            ]
        ];
    }
}

// Positive feedback for good performance with trend awareness
if ($accuracy >= 90 && $efficiency >= 85 && $readability >= 85) {
    $trendMessage = '';
    if ($accuracyTrend === 'improving' || $efficiencyTrend === 'improving' || $readabilityTrend === 'improving') {
        $trendMessage = ' Your performance is improving across multiple metrics!';
    }
    
    $description = 'You\'re doing great! Your code quality is excellent across all metrics.' . $trendMessage . ' Keep up the good work!';
    
    $recommendations[] = [
        'category' => 'Achievement',
        'priority' => 'low',
        'title' => 'Excellent Performance!',
        'description' => $description,
        'exercises' => [
            'Try advanced challenges to push your skills further',
            'Help others by explaining your solutions',
            'Explore advanced topics in ' . strtoupper($language),
            'Practice with competitive programming problems'
        ],
        'hints' => [
            'Continue practicing to maintain your skills',
            'Share your knowledge with others',
            'Explore new programming paradigms',
            'Challenge yourself with harder problems'
        ],
        'studyMaterials' => [
            'Advanced ' . strtoupper($language) . ' Programming',
            'Design Patterns and Best Practices',
            'System Design Principles',
            'Contributing to Open Source Projects'
        ]
    ];
}

// Add data quality warning if insufficient data
if ($totalAttempts < 3) {
    array_unshift($recommendations, [
        'category' => 'Data Quality',
        'priority' => 'medium',
        'title' => 'More Data Needed',
        'description' => 'You have only ' . $totalAttempts . ' attempt(s) recorded. Complete more challenges to get more accurate and personalized recommendations.',
        'exercises' => [
            'Complete at least 5 challenges to get better insights',
            'Try both Story Mode and Challenge Mode',
            'Attempt challenges of different difficulty levels'
        ],
        'hints' => [
            'The more challenges you complete, the better we can understand your coding patterns',
            'Try to complete challenges across different topics'
        ],
        'studyMaterials' => []
    ]);
}

// Add overall performance summary if user has enough data
if ($totalAttempts >= 5 && count($recommendations) > 0) {
    $strongestMetric = '';
    $strongestValue = 0;
    $weakestMetric = '';
    $weakestValue = 100;
    
    $metrics = [
        'Accuracy' => $accuracy,
        'Efficiency' => $efficiency,
        'Readability' => $readability
    ];
    
    foreach ($metrics as $name => $value) {
        if ($value > $strongestValue) {
            $strongestValue = $value;
            $strongestMetric = $name;
        }
        if ($value < $weakestValue) {
            $weakestValue = $value;
            $weakestMetric = $name;
        }
    }
    
    // Only add summary if there's a clear strongest/weakest
    if ($strongestValue > $weakestValue + 10) {
        $summaryIndex = count($recommendations);
        $recommendations[] = [
            'category' => 'Performance Summary',
            'priority' => 'low',
            'title' => 'Your Performance Profile',
            'description' => "Based on {$totalAttempts} attempts: Your strongest area is {$strongestMetric} ({$strongestValue}%), while {$weakestMetric} ({$weakestValue}%) needs the most improvement. " . 
                           ($accuracyTrend === 'improving' ? 'Great job on improving your accuracy!' : '') .
                           ($efficiencyTrend === 'improving' ? 'Your efficiency is getting better!' : ''),
            'exercises' => [],
            'hints' => [
                "Focus on improving your {$weakestMetric} while maintaining your strong {$strongestMetric}",
                'Balance your practice across all coding aspects'
            ],
            'studyMaterials' => []
        ];
    }
}

// Sort by priority (high first)
usort($recommendations, function($a, $b) {
    $priorityOrder = ['high' => 3, 'medium' => 2, 'low' => 1];
    return $priorityOrder[$b['priority']] - $priorityOrder[$a['priority']];
});

$response['success'] = true;
$response['recommendations'] = $recommendations;
$response['message'] = 'OK';
$response['metadata'] = [
    'totalAttempts' => $totalAttempts,
    'accuracyTrend' => $accuracyTrend,
    'efficiencyTrend' => $efficiencyTrend,
    'hasEnoughData' => $totalAttempts >= 5
];

$conn->close();
echo json_encode($response);
ini_set('display_errors', $prevDisplayErrors);
?>
