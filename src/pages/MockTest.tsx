
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { getMockTests, submitMockTest } from '@/services/courseService';

// Mock questions for different test categories
const mockQuestions = {
  'aptitude-test-1': [
    {
      id: 'q1',
      question: 'If a train travels at 60 km/h, how far will it travel in 2.5 hours?',
      options: ['120 km', '150 km', '180 km', '200 km'],
      answer: '150 km'
    },
    {
      id: 'q2',
      question: 'Find the next number in the sequence: 2, 5, 10, 17, 26, ...',
      options: ['35', '36', '37', '38'],
      answer: '37'
    },
    {
      id: 'q3',
      question: 'If 6 workers can build a wall in 12 days, how many days will it take 9 workers to build the same wall?',
      options: ['8', '6', '9', '18'],
      answer: '8'
    },
  ],
  'coding-challenge-1': [
    {
      id: 'q1',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      answer: 'O(log n)'
    },
    {
      id: 'q2',
      question: 'Which data structure operates on FIFO principle?',
      options: ['Stack', 'Queue', 'Tree', 'Graph'],
      answer: 'Queue'
    },
    {
      id: 'q3',
      question: 'What is the output of the following code?\n\nint x = 5;\nint y = x++;\nconsole.log(y);',
      options: ['5', '6', '4', 'Error'],
      answer: '5'
    },
  ],
  'communication-assessment': [
    {
      id: 'q1',
      question: 'Which of the following is NOT a component of effective communication?',
      options: ['Active listening', 'Clear messaging', 'Ignoring feedback', 'Body language'],
      answer: 'Ignoring feedback'
    },
    {
      id: 'q2',
      question: 'What is the best way to handle a disagreement during a professional discussion?',
      options: ['Avoid the topic', 'State your point and ignore others', 'Listen to different perspectives and find common ground', 'Let the senior person decide'],
      answer: 'Listen to different perspectives and find common ground'
    },
    {
      id: 'q3',
      question: 'Which statement about email communication is most accurate?',
      options: ['Longer emails are always better as they provide more detail', 'Email is only appropriate for informal communication', 'Clear subject lines help recipients prioritize messages', 'All professional emails should include emojis'],
      answer: 'Clear subject lines help recipients prioritize messages'
    },
  ],
  'advanced-aptitude': [
    {
      id: 'q1',
      question: 'A batsman scored 110 runs which included 3 boundaries and 8 sixes. What percent of his total score did he make by running between the wickets?',
      options: ['45%', '55%', '60%', '40%'],
      answer: '45%'
    },
    {
      id: 'q2',
      question: 'If log(x) + log(y) = log(xy) is true, then log(x/y) equals:',
      options: ['log(x) - log(y)', 'log(x) + log(y)', '2*log(x) - 2*log(y)', 'Cannot be determined'],
      answer: 'log(x) - log(y)'
    },
    {
      id: 'q3',
      question: 'A reduction of 20% in the price of sugar allows a housewife to buy 6 kg more for Rs. 240. What is the original price per kg of sugar?',
      options: ['Rs. 10', 'Rs. 12', 'Rs. 8', 'Rs. 15'],
      answer: 'Rs. 10'
    },
  ]
};

const MockTest = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['mockTests'],
    queryFn: () => getMockTests()
  });
  
  useEffect(() => {
    if (data?.mockTests) {
      const foundTest = data.mockTests.find((t: any) => t.id === testId);
      if (foundTest) {
        setTest(foundTest);
      } else {
        toast.error('Test not found');
        navigate('/dashboard');
      }
    }
  }, [data, testId, navigate]);
  
  const questions = testId ? mockQuestions[testId as keyof typeof mockQuestions] || [] : [];
  
  if (isLoading || !test) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 mb-4 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-100 mb-8 rounded"></div>
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    toast.error("Failed to load test. Please try again later.");
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-red-500">Failed to load test. Please try again later.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleAnswerSelect = (questionId: string, selectedOption: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const calculateScore = () => {
    let correct = 0;
    
    questions.forEach(question => {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    });
    
    return (correct / questions.length) * 100;
  };
  
  const handleSubmitTest = async () => {
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions < questions.length) {
      const unanswered = questions.length - answeredQuestions;
      const confirmSubmit = window.confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to submit?`);
      
      if (!confirmSubmit) return;
    }
    
    try {
      setIsSubmitting(true);
      const finalScore = calculateScore();
      setScore(finalScore);
      
      const result = await submitMockTest(test.id, finalScore);
      if (result.success) {
        toast.success(`Test submitted! You earned ${result.pointsAwarded} points`);
        setTestComplete(true);
      } else {
        toast.error('Failed to submit test');
      }
    } catch (error) {
      toast.error('Error submitting test');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  if (testComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Test Completed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <h2 className="text-2xl font-bold">Your Score: {score.toFixed(0)}%</h2>
              <Progress value={score} className="h-4" />
              
              {score >= 70 ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">Great job! You've passed the test.</p>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 font-semibold">Keep practicing! Try again to improve your score.</p>
                </div>
              )}
              
              <div className="pt-4">
                <p className="mb-4">You've earned points for completing this test!</p>
                <p className="text-xl font-bold text-primary">+150 points</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded mr-4 mb-2 sm:mb-0">
              {test.category}
            </span>
            <span className="text-gray-600 mr-4 mb-2 sm:mb-0">Duration: {test.duration}</span>
            <span className="text-gray-600">Difficulty: {test.difficulty}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Progress: {progress.toFixed(0)}%</span>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {currentQuestion ? (
              <div>
                <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
                
                <RadioGroup 
                  value={answers[currentQuestion.id] || ''} 
                  onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <p>No questions available for this test.</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitTest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default MockTest;
