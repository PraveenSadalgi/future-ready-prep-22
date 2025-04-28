
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
import TestTimer from '@/components/TestTimer';
import { getMockTests, submitMockTest } from '@/services/courseService';

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
    {
      id: 'q4',
      question: 'A shopkeeper sells an item at 20% profit. If the cost price is Rs. 1500, what is the selling price?',
      options: ['Rs. 1700', 'Rs. 1800', 'Rs. 1900', 'Rs. 2000'],
      answer: 'Rs. 1800'
    },
    {
      id: 'q5',
      question: 'What is the probability of getting a sum of 7 when two dice are rolled?',
      options: ['1/6', '1/9', '1/12', '5/36'],
      answer: '1/6'
    }
  ],
  'basic-coding-test': [
    {
      id: 'q1',
      question: 'What is the output of: console.log(typeof [])?',
      options: ['array', 'object', 'undefined', 'null'],
      answer: 'object'
    },
    {
      id: 'q2',
      question: 'Which method is used to add an element at the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      answer: 'push()'
    },
    {
      id: 'q3',
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets'
    }
  ],
  'advanced-dsa': [
    {
      id: 'q1',
      question: 'What is the time complexity of quicksort in the average case?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n log n)'
    },
    {
      id: 'q2',
      question: 'Which data structure is best suited for implementing a priority queue?',
      options: ['Array', 'Linked List', 'Heap', 'Stack'],
      answer: 'Heap'
    },
    {
      id: 'q3',
      question: 'What is the space complexity of DFS (Depth-First Search)?',
      options: ['O(1)', 'O(n)', 'O(V+E)', 'O(b^d)'],
      answer: 'O(V+E)'
    }
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
  const [testStarted, setTestStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['mockTests'],
    queryFn: () => getMockTests()
  });

  useEffect(() => {
    if (data?.mockTests) {
      const foundTest = data.mockTests.find((t: any) => t.id === testId);
      if (foundTest) {
        setTest(foundTest);
        if (testId && mockQuestions[testId as keyof typeof mockQuestions]) {
          const shuffledQuestions = shuffleQuestions(mockQuestions[testId as keyof typeof mockQuestions]);
          setQuestions(shuffledQuestions);
        }
      } else {
        toast.error('Test not found');
        navigate('/dashboard');
      }
    }
  }, [data, testId, navigate]);

  const shuffleQuestions = (questions: any[]) => {
    return [...questions].sort(() => Math.random() - 0.5);
  };

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

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleTimeUp = () => {
    toast.warning("Time's up! Submitting test...");
    handleSubmitTest();
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
          <h1 className="text-3xl font-bold mb-2">{test?.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded mr-4 mb-2 sm:mb-0">
                {test?.category}
              </span>
              <span className="text-gray-600 mr-4">Duration: {test?.duration}</span>
              <span className="text-gray-600">Difficulty: {test?.difficulty}</span>
            </div>
            {testStarted && (
              <TestTimer 
                duration={45} 
                onTimeUp={handleTimeUp}
              />
            )}
          </div>
        </div>

        {!testStarted ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Ready to start the test?</h2>
                <p className="text-gray-600 mb-6">
                  You will have {test?.duration} to complete {questions.length} questions.
                  Make sure you're ready before starting.
                </p>
                <Button onClick={handleStartTest}>
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
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
                      {currentQuestion.options.map((option: string, index: number) => (
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default MockTest;
