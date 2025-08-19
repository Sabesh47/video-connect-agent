import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle } from "lucide-react";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const documentQuestions = [
  {
    category: "Aadhaar Card",
    questions: [
      {
        question: "Is the Aadhaar card clearly visible and readable?",
        expectedAnswer: "Yes, the Aadhaar card should be clearly visible with all text readable and not blurred."
      },
      {
        question: "Does the name match across all documents?",
        expectedAnswer: "Yes, the name should match exactly across Aadhaar, PAN, and other documents."
      },
      {
        question: "Is the photograph clear and matches the customer?",
        expectedAnswer: "Yes, the photograph should be clear and match the customer's current appearance."
      },
      {
        question: "Are all 12 digits of Aadhaar number visible?",
        expectedAnswer: "Yes, all 12 digits should be clearly visible and readable."
      }
    ]
  },
  {
    category: "PAN Card",
    questions: [
      {
        question: "Is the PAN card original and not a photocopy?",
        expectedAnswer: "Yes, should be an original PAN card with proper texture and security features."
      },
      {
        question: "Is the PAN number clearly visible?",
        expectedAnswer: "Yes, the 10-character PAN number should be clearly readable."
      },
      {
        question: "Does the name match with other documents?",
        expectedAnswer: "Yes, the name should match exactly with Aadhaar and other documents."
      },
      {
        question: "Is the card not damaged or tampered?",
        expectedAnswer: "Yes, the card should be in good condition without any signs of tampering."
      }
    ]
  },
  {
    category: "Bank Statement",
    questions: [
      {
        question: "Is the statement recent (within 3 months)?",
        expectedAnswer: "Yes, the statement should be dated within the last 3 months."
      },
      {
        question: "Does the address match with other documents?",
        expectedAnswer: "Yes, the address should match exactly with Aadhaar card address."
      },
      {
        question: "Are bank details clearly visible?",
        expectedAnswer: "Yes, bank name, account number, and IFSC code should be clearly visible."
      },
      {
        question: "Is it an original statement from the bank?",
        expectedAnswer: "Yes, should be an official bank statement with proper letterhead and seal."
      }
    ]
  }
];

export const QuestionModal = ({ isOpen, onClose }: QuestionModalProps) => {
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set());
  const [showExpectedAnswer, setShowExpectedAnswer] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");

  const handleQuestionChange = (questionId: string, checked: boolean) => {
    const newChecked = new Set(checkedQuestions);
    if (checked) {
      newChecked.add(questionId);
    } else {
      newChecked.delete(questionId);
    }
    setCheckedQuestions(newChecked);
  };

  const toggleExpectedAnswer = (questionId: string) => {
    const newShowExpected = new Set(showExpectedAnswer);
    if (newShowExpected.has(questionId)) {
      newShowExpected.delete(questionId);
    } else {
      newShowExpected.add(questionId);
    }
    setShowExpectedAnswer(newShowExpected);
  };

  const handleSubmit = () => {
    console.log("Checked questions:", Array.from(checkedQuestions));
    console.log("Notes:", notes);
    onClose();
  };

  const totalQuestions = documentQuestions.reduce((acc, cat) => acc + cat.questions.length, 0);
  const completedQuestions = checkedQuestions.size;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Verification Questions</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedQuestions}/{totalQuestions} completed
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Questions by Document */}
          <div className="space-y-4">
            {documentQuestions.map((docCategory, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-soft">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>{docCategory.category}</span>
                  </h3>
                  <div className="space-y-3">
                    {docCategory.questions.map((questionItem, questionIndex) => {
                      const questionId = `${categoryIndex}-${questionIndex}`;
                      const isChecked = checkedQuestions.has(questionId);
                      const showAnswer = showExpectedAnswer.has(questionId);
                      
                      return (
                        <div key={questionIndex} className="border rounded-lg p-3">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id={questionId}
                              checked={isChecked}
                              onCheckedChange={(checked) => 
                                handleQuestionChange(questionId, checked as boolean)
                              }
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label 
                                htmlFor={questionId} 
                                className={`text-sm cursor-pointer block ${
                                  isChecked ? 'text-success line-through' : ''
                                }`}
                              >
                                {questionItem.question}
                              </label>
                              <div className="mt-2 flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpectedAnswer(questionId)}
                                  className="h-6 px-2 text-xs"
                                >
                                  {showAnswer ? "Hide" : "Show"} Expected Answer
                                </Button>
                              </div>
                              {showAnswer && (
                                <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
                                  <strong>Expected:</strong> {questionItem.expectedAnswer}
                                </div>
                              )}
                            </div>
                            {isChecked && (
                              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Notes */}
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Additional Notes</h3>
              <Textarea
                placeholder="Add any additional observations or concerns about the documents..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-primary"
              disabled={completedQuestions === 0}
            >
              Save Verification ({completedQuestions}/{totalQuestions})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};