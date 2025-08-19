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
      "Is the Aadhaar card clearly visible and readable?",
      "Does the name match across all documents?",
      "Is the photograph clear and matches the customer?",
      "Are all 12 digits of Aadhaar number visible?"
    ]
  },
  {
    category: "PAN Card",
    questions: [
      "Is the PAN card original and not a photocopy?",
      "Is the PAN number clearly visible?",
      "Does the name match with other documents?",
      "Is the card not damaged or tampered?"
    ]
  },
  {
    category: "Bank Statement",
    questions: [
      "Is the statement recent (within 3 months)?",
      "Does the address match with other documents?",
      "Are bank details clearly visible?",
      "Is it an original statement from the bank?"
    ]
  }
];

export const QuestionModal = ({ isOpen, onClose }: QuestionModalProps) => {
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set());
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
                    {docCategory.questions.map((question, questionIndex) => {
                      const questionId = `${categoryIndex}-${questionIndex}`;
                      const isChecked = checkedQuestions.has(questionId);
                      
                      return (
                        <div key={questionIndex} className="flex items-start space-x-3">
                          <Checkbox
                            id={questionId}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              handleQuestionChange(questionId, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <label 
                            htmlFor={questionId} 
                            className={`text-sm flex-1 cursor-pointer ${
                              isChecked ? 'text-success line-through' : ''
                            }`}
                          >
                            {question}
                          </label>
                          {isChecked && (
                            <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                          )}
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